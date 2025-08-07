import { ChatContext } from "@/contexts/ChatContext";
import { useContext } from "react";

export function useChat() {
    const ctx = useContext(ChatContext)
    if(!ctx) {
        throw 'no chat context found'
    }
    return ctx
}