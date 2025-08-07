import { loginUser, signOutUser, signUpUser } from "@/services/authService";
import { AuthContextValue, User } from "@/types";
import supabase from "@/utils/supabase";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    // on start app try track current user 
    useEffect(() => {
        //prevent update after unmounted (isMounted = false)
        let isMounted = true

        //get user if exist session
        supabase.auth.getUser().then(({ data: { user }, error}) => {
            if(error) {
                console.log('[user] no session found')
            }
            else if (isMounted) {
                setUser(user)
                setLoading(false)
            }
        })

        //unsubscribe listener
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setUser(session?.user ?? null)
            }
        })

        return () => {
            isMounted = false
            listener.subscription.unsubscribe()
        }
    }, [])

    async function tryLogin(emailOrPhone: string, password: string) {
        const user = await loginUser(emailOrPhone, password)

        setUser(user)

        return user
    }

    async function trySignUp(email: string, password: string, userData: object) {
        const user = await signUpUser(email, password, userData)

        return user
    }

    async function trySignOut(scope?: "local" | "global" | "others" | undefined) {
        signOutUser(scope).then(isSignOut => {
            if(isSignOut) {
                console.log('success')
                setUser(null)
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                tryLogin,
                trySignUp,
                trySignOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}