/* import */
import { JSX } from "react"
import { Chat, Message, Participant } from "./supabase_table_types"

/* export */
export type { User } from "@supabase/supabase-js"
export * from "./supabase_table_types"
export * from "./context_value_types"

/* ---other types--- */

//user metadata
export type UserMetadata = {
    email: string
    first_name: string
    last_name: string
}

//layer structure
export type LayerNode = LayerStructure | JSX.Element

export type LayerStructure = {
    [key: string]: LayerNode
    element: JSX.Element
}

//chat info
export interface ChatInfo extends Chat {
    participants?: Participant[]
    messages?: Message[]
    last_message?: Message
}