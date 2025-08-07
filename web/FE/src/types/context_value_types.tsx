import { User } from "@supabase/supabase-js"
import { JSX } from "react"
import { Chat, ChatInfo, Profile } from "."

/* ===Context Values=== */
export interface AuthContextValue {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    tryLogin: (emailOrPhone: string, password: string) => Promise<User | null>,
    trySignUp: (email: string, password: string, userData: object) => Promise<User | null>,
    trySignOut: (scope?: "local" | "global" | "others" | undefined) => Promise<void>
}

export type LayerContextValue = {
    layer: JSX.Element
    layerLocation: string
    action: React.RefObject<"prev" | "next">
    nextLayer: (layerName: string) => void
    prevLayer: () => void
    navigateLayer: (location: string) => void
}

export type PopupContextValue = { 
    popup: JSX.Element | null
    setPopup: React.Dispatch<React.SetStateAction<JSX.Element | null>>
    isVisible: boolean
    hide: () => void
    show: () => void
}

export type ChatContextValue = { 
    currentChatInfo: ChatInfo | null
    chatInfoList: ChatInfo[]
    getUserChatInfoList: (user_id: string) => Promise<void>
    newChat(chat: Partial<Chat>, participantProfiles: Profile[]): Promise<void>
    switchChat: (chatInfo: ChatInfo) => void
    _deleteChat: (chat_id: string) => Promise<void>
    upsertChat(chat_id: string, status: "active" | "inactive"): Promise<void>
}

export type LeftDivWidthContextValue = { 
    leftDivWidth: number
    setMinWidth: React.Dispatch<React.SetStateAction<number>>
    isResizing: boolean
    setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
    preventShrink: () => void
    backToDefault: () => void
}