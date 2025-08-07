import { PopupContext } from "@/contexts/PopupContext";
import { useContext } from "react";

export function usePopup() {
    const ctx = useContext(PopupContext)
    if(!ctx) {
        throw 'no popup context found'
    }
    return ctx
}