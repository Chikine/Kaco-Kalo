import supabase from "@/utils/supabase"

/**
 * login with user Email / user Phone and Password
 */
export async function login( emailOrPhone: string, password: string) {
    const { data, error } = emailOrPhone.split('').includes('@') ?
    await supabase.auth.signInWithPassword({
        email: emailOrPhone,
        password
    }) :
    await supabase.auth.signInWithPassword({
        phone: emailOrPhone,
        password
    })

    if (error) throw error

    return data
}

/**
 * sign up with user Email and Password, with user initial data 
 * @remark userData datas must be in JSON type,
 * use JSON.stringify before add into function
 */
export async function signUp(email: string, password: string, userData: object) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: userData
        }
    })

    if (error) throw error

    return data
}

/**
 * sign out with scope, return true if successful
 * @remark about scope value
 * + local : sign out on current device
 * + global : sign out on all devices
 * + others : sign out on other devices
 * @returns 
 */
export async function signOut(scope?: "local" | "global" | "others" | undefined) {
    const { error } = await supabase.auth.signOut({scope})

    if(error) throw error

    return !error
}