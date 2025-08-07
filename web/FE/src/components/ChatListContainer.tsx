import { getChats } from "@/api/chatApi"
import { useAuth } from "@/hooks/useAuth"
import { useChat } from "@/hooks/useChat"

export function ChatListContainer() {
    const { user } = useAuth()

    const { chatInfoList, _deleteChat } = useChat()

    async function deleteAllChat() {
        if(user) {
            const list = await getChats(user.id)
            list.forEach(async({chat_id}) => {
                await _deleteChat(chat_id)
            })
        }
    }

    return (
        <div
            className="absolute left-0 top-0 w-full h-full flex flex-col"
        >
            <div className="self-start text-green-500">
                chat list container here
            </div>
            <button 
                onClick={() => deleteAllChat()}
                className="self-start text-red-500"
            >[test] delete all chat</button>
            {chatInfoList && chatInfoList.map((info, i) => {
                return <div key={i}>
                    {info.name}
                </div>
            })}
        </div>
    )
}