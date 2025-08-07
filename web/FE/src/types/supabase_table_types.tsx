import { Tables } from "./supabase"

/* +++supabase types+++ */

export type Profile = Tables<'profiles'>

/**
 * + status: 'active' | 'inactive'
 */
export type Chat = Tables<'chats'>

/**
 * + role: 'member' | 'admin'
 */
export type Participant = Tables<'participants'>

/**
 * + type: 'text' | 'image' | 'video' | 'sound' | 'file' | 'reference' | 'url'
 */
export type Message = Tables<'messages'>