import { LeftDivWidthContext } from "@/contexts/LeftDivWidthContext";
import { useContext } from "react";

export function useLeftDivWidth() {
    const ctx = useContext(LeftDivWidthContext)
    if(!ctx) {
        throw 'no context found'
    }
    return ctx
}