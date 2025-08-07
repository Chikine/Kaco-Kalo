import { ProfileContext } from "@/contexts/ProfileContext";
import { useContext } from "react";

export function useProfile() {
    const ctx = useContext(ProfileContext)
    if(!ctx) {
        throw 'no profile context found'
    }

    return ctx
}