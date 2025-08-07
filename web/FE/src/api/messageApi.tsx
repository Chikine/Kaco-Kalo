import { Message } from "@/types";
import supabase from "@/utils/supabase";

export async function getMessages(chat_id: string, limit = 15) {
    const {data: messages, error} = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chat_id)
        .order('created_at', {ascending: true})
        .limit(limit)

    if(error) throw error

    return messages
}

export function newMessageInsertListener(listener: (message: Message) => any, allowChatIds?: string[]) {
    const channel = supabase
        .channel('message_listener')
        .on('postgres_changes', 
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: allowChatIds?.length ? `chat_id=in.(${allowChatIds.join(',')})` : undefined
            },
            (payload) => {
                const message = payload.new as Message
                listener(message)
            }
        ).subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}