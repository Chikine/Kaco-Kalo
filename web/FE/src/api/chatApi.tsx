import { Chat, Participant } from "@/types";
import supabase from "@/utils/supabase";

export async function getChats(user_id: string) {
    const {data, error} = await supabase
        .from('participants')
        .select('chat_id, chats(*)')
        .eq('user_id', user_id)
    
    if(error) throw error

    return data
}

export async function setChat(chat_id: string, params: Partial<Chat>) {
    const { error } = await supabase
        .from('chats')
        .upsert(params)
        .eq('chat_id', chat_id)

    if(error) throw error
}

export async function getChatParticipants(chat_id: string) {
    const {data, error} = await supabase
        .from('participants')
        .select('*')
        .eq('chat_id', chat_id)

    if(error) throw error

    return data
}

export async function upsertChatParticipants(chat_id: string, participants: Participant[]) {
    const {error} = await supabase
        .from('participants')
        .upsert(participants.map(participant => ({...participant, chat_id})))

    if(error) throw error
}

export async function deleteChatPartitipants(chat_id: string, participants: Participant[]) {
    const {error} = await supabase
        .from('participants')
        .delete()
        .eq('chat_id', chat_id)
        .in('user_id', participants.map(({user_id}) => user_id))

    if(error) throw error
}

export async function createChat(chat: Partial<Chat>) {
    const {data, error} = await supabase
        .from('chats')
        .insert(chat)
        .select()

    if(error) throw error

    return data[0]
}

export async function getUserOnChat(chat_id: string, user_id: string) {
    const {data, error} = await supabase
        .from('participants')
        .select('*')
        .eq('chat_id', chat_id)
        .eq('user_id', user_id)

    if(error) throw error

    return data[0]
}

export async function deleteUserChat(chat_id: string) {
    const {error} = await supabase
        .from('chats')
        .delete()
        .eq('id', chat_id)

    if(error) throw error
}

export function newChatInsertListener(listener: (chat: Chat) => any, user_id: string) {
    const channel = supabase
        .channel('chats-listener')
        .on('postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'chats'
            },
            (payload) => {
                const chat = payload.new as Chat

                getChatParticipants(chat.id).then(participants => {
                    if(participants.some(participant => participant.user_id === user_id)) {
                        listener(chat)
                    }
                })
            }
        ).subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}