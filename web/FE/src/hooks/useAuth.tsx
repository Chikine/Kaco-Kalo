import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) {
        throw 'no auth context found'
    }
    return ctx
}