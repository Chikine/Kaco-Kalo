import { getDefaultProfile, getUserProfile, setUserProfile } from "@/api/profileApi";
import { useAuth } from "@/hooks/useAuth";
import { Profile, User } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface ProfileContextValue {
    profile: Profile | null,
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>,
    loading: boolean,
    loadProfile: (user: User | null) => Promise<void>,
    resetProfile: (user: User | null) => Promise<void>
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({children} : {children: ReactNode}) {
    const [profile, setProfile] = useState<Profile | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuth()

    //on change user, if user exist will load / create user profile
    useEffect(() => {
        loadProfile(user)
    }, [user])

    //profile load / create
    async function loadProfile(user: User | null) {
        if(user) {
            setLoading(true)
            try {
                const profile = await getUserProfile(user.id)

                if(profile) {
                    setProfile(profile)
                }
                else {
                    const newProfile = await getDefaultProfile(user)
                    setProfile(newProfile)
                    //add to database
                    setUserProfile(user, newProfile)
                }
            } catch (e) {
                console.log('[profile error] -', e)
                //still get and set default profile
                const newProfile = await getDefaultProfile(user)
                setProfile(newProfile)
            }
        }
        else {
            setProfile(null)
        }
        setLoading(false)
    }

    //profile reset
    async function resetProfile(user: User | null) {
        if(user) {
            const newProfile = await getDefaultProfile(user)
            setProfile(newProfile)
        }
    }

    return (
        <ProfileContext.Provider value={{
            profile,
            setProfile,
            loading,
            loadProfile,
            resetProfile
        }}>
            {children}
        </ProfileContext.Provider>
    )
}