import { login, signOut, signUp } from "@/api/authApi";
import { toast } from "react-toastify";

/**
 * login user with user cerdential
 */
export async function loginUser(emailOrPhone: string, password: string) {
    try {
        const { user } = await login(emailOrPhone, password)

        return user
    } catch (e) {
        toast.error('login failed: user not found')
        console.log('[login error] -', e)
        return null
    }
}

/**
 * sign up user with user email and password and userdata
 */
export async function signUpUser(email: string, password: string, userData: object) {
    try {
        const { user } = await signUp(email, password, userData)

        return user
    } catch (e) {
        toast.error('sign up failed: unexpected error')
        console.log('[sign up error] -', e)
        return null
    }
}

/** sign out with scope */
export async function signOutUser(scope?: "local" | "global" | "others" | undefined) {
    try {
        await signOut(scope)

        return true
    } catch (e) {
        console.error(e)
        
        return false
    }
}