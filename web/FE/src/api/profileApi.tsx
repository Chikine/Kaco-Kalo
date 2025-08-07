import { Profile, User, UserMetadata } from "@/types";
import supabase from "@/utils/supabase";

export async function getUserProfile(user_id: string) {
    const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)

    if(error) throw error

    return data?.[0] as Profile | null
}

export async function setUserProfile(user: User, profile: Profile) {
    const {error} = await supabase
        .from('profiles')
        .upsert({...profile})
        .eq('user_id', user.id)

    if(error) throw error
}

//not a hook!
export async function getDefaultProfile(user: User) : Promise<Profile> {
    const metadata = user.user_metadata as UserMetadata

    const profile: Profile = {
        name: metadata.first_name.trim() + ' ' + metadata.last_name.trim(),
        email: metadata.email,
        user_id: user.id,
        created_at: user.created_at,
        updated_at: user.created_at,
        avatar_url: '', //will change later to a default avatar or smth like first char in name
        bio: '',
        displayName: ''
    }

    return profile
}