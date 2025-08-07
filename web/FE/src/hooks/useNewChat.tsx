import { Chat } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { newChatInsertListener } from "@/api/chatApi";

export function useNewChat() {
    const {user} = useAuth()

    const [newChat, setNewChat] = useState<Chat | null>(null)

    function onNewChat(chat: Chat) {
        setNewChat(chat)
    }

    useEffect(() => {
        if(user) {
            const unSubscribe = newChatInsertListener(onNewChat, user.id)

            return unSubscribe
        }
    }, [user, onNewChat])

    return {newChat}
}