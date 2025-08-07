import { newMessageInsertListener } from "@/api/messageApi";
import { Message } from "@/types";
import { useEffect, useState } from "react";

export function useNewMessage() {
    const [newMessage, setNewMessage] = useState<Message | null>(null)

    const [allowRealtimeChatIds, setAllowRealtimeChatIds] = useState<string[]>([])

    function onNewMessage(message: Message) {
        setNewMessage(message)
    }

    useEffect(() => {
        const unSubscribe = newMessageInsertListener(onNewMessage, allowRealtimeChatIds)
        return unSubscribe
    }, [onNewMessage, allowRealtimeChatIds])

    return {newMessage, setAllowRealtimeChatIds}
}