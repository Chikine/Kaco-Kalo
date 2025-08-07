import { LayerContext } from "@/contexts/LayerContext";
import { useContext } from "react";

export function useLayer() {
    const ctx = useContext(LayerContext)
    if(!ctx) {
        throw 'no provider found'
    }
    return ctx
}