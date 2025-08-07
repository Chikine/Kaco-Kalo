import { createChat, deleteUserChat, getChatParticipants, getChats, getUserOnChat, setChat, upsertChatParticipants } from "@/api/chatApi"
import { getMessages } from "@/api/messageApi"
import { useAuth } from "@/hooks/useAuth"
import { useNewChat } from "@/hooks/useNewChat"
import { useNewMessage } from "@/hooks/useNewMessage"
import { Chat, ChatContextValue, ChatInfo, Participant, Profile } from "@/types"
import { createContext, ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({children} : {children: ReactNode}) {
    const { user } = useAuth()

    /* chats */
    const [currentChatInfo, setCurrentChatInfo] = useState<ChatInfo | null>(null)

    const [chatInfoList, setChatInfoList] = useState<ChatInfo[]>([])

    const {newChat: newUserChat} = useNewChat()

    async function getUserChatInfoList(user_id: string) {
        try {
            const list = await Promise.all(
                (await getChats(user_id)).map(async({chats, chat_id}) => {
                    const [last_message] = await getMessages(chat_id)
                    return {...chats, last_message} as ChatInfo
                })
            )

            setChatInfoList(sortChatInfoList(list))
        } catch (error) {
            console.log(error)
        }
    }

    async function newChat(chat: Partial<Chat>, participantProfiles: Profile[]) {
        const newChat = await createChat(chat)

        const participants = participantProfiles.map(profile => ({
            user_id: profile.user_id,
            chat_id: newChat.id,
            nickname: profile.displayName,
            role: user?.id === profile.user_id ? 'admin' : 'member'
        } as Participant))

        await upsertChatParticipants(newChat.id, participants)

        switchChat({...newChat, participants})
    }

    async function _deleteChat(chat_id: string) {
        if(user) {
            try {
                const userOnChat = await getUserOnChat(chat_id, user.id)

                //if not the admin of chat, reject
                if(userOnChat.role !== 'admin') {
                    throw 'not chat admin'
                } else {
                    await deleteUserChat(chat_id)

                    setChatInfoList(prevList => prevList.filter(info => info.id !== chat_id))
                    setCurrentChatInfo(info => info?.id === chat_id ? null : info)
                    toast.success('successfully remove chat')
                }
            } catch (e) {
                console.log(e)
                toast.error('you have no permission to delete chat!')
            }
        }
    }

    async function upsertChat(chat_id: string, status: 'active' | 'inactive') {
        await setChat(chat_id, {status})
    }

    function sortChatInfoList(list: ChatInfo[]) {
        return list.sort((a,b) => {
            //if a new chat is added (no message yet) try use create time to compare
            return (b.last_message?.created_at || b.created_at).localeCompare((a.last_message?.created_at || a.created_at))
        })
    }

    function switchChat(chatInfo: ChatInfo) {
        if(currentChatInfo && currentChatInfo.id !== chatInfo.id) {
            setChatInfoList(prev => prev.map(info => info.id === currentChatInfo.id ? 
                currentChatInfo : info
            ))
        }
        setCurrentChatInfo(chatInfo)
    }

    useEffect(() => {
        if(user) {
            getUserChatInfoList(user.id)
        }
    }, [user])

    useEffect(() => {
        if(newUserChat) {
            setChatInfoList(prevList => sortChatInfoList([...prevList, newUserChat as ChatInfo]))
        }
    }, [newUserChat])

    useEffect(() => {
        if(currentChatInfo) {
            (async() => {
                //if not realtime fetch chat yet add to avail chat id
                if(!currentChatInfo.messages) {
                    const messages = await getMessages(currentChatInfo.id)

                    setCurrentChatInfo(prev => (prev ? {...prev, messages} : prev))
                    setAllowRealtimeChatIds(prev => [...prev, currentChatInfo.id])
                }

                //add listener later
                if(!currentChatInfo.participants) {
                    const participants = await getChatParticipants(currentChatInfo.id)
                    setCurrentChatInfo(prev => (prev ? {...prev, participants} : prev))
                }
            })()
        }
    }, [currentChatInfo])

    /* messages */
    const {newMessage, setAllowRealtimeChatIds} = useNewMessage()

    useEffect(() => {
        setAllowRealtimeChatIds(chatInfoList.map(chat => chat.id))
    }, [chatInfoList])

    useEffect(() => {
        if(newMessage) {
            setChatInfoList(prev => {
                const list = prev.map(info => info.id === newMessage.chat_id ? {...info, last_message: newMessage} : info)

                return sortChatInfoList(list)
            })
        }
    }, [newMessage])

    return <ChatContext.Provider
        value={{
            currentChatInfo,
            chatInfoList,
            getUserChatInfoList,
            newChat,
            switchChat,
            _deleteChat,
            upsertChat
        }}
    >{
        children}
    </ChatContext.Provider>
}