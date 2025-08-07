import { InputBoxWithDynamicPlaceholder } from "@/components/InputBoxWithDynamicPlaceholder";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function LoginPage() {
    const emailOrPhoneRef = useRef<string>('')

    const passwordRef = useRef<string>('')

    const { tryLogin, user, setUser } = useAuth()

    const navigate = useNavigate()

    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password')

    async function handleClickLogin() {
        if(emailOrPhoneRef.current.trim() && passwordRef.current.trim()) {
            const user = await tryLogin(emailOrPhoneRef.current, passwordRef.current)

            if(user) {
                if (user.email_confirmed_at) {
                    toast.success('successfully login!', {
                        onClose: () => {
                            setUser(user)
                        }
                    })
                } else {
                    toast.warning('you must confirm your email first')
                }
            }
        }
    }

    useEffect(() => {
        if(user) {
            navigate('/home')
        }
    }, [user])

    function handleNavigateSignUp() {
        navigate('/signup')
    }

    return( 
        <div className="relative h-full aspect-square bg-transparent flex flex-col">
            <div className="relative h-full flex justify-center">
                <div className="absolute top-3/7 left-1/2 -translate-y-1/2 -translate-x-1/2 w-60 aspect-square">
                    <img src={"/KacoKalo-remove-bg.png"} />
                </div>
                <div className="relative self-end flex flex-col text-center">
                    <div className="text-4xl font-bold">Welcome to KacoKalo</div>
                    <div className="font-thin">please sign in to our fantastic app here</div>
                </div>
            </div>
            <div className="relative h-full flex flex-col items-center mt-10 gap-5">
                <InputBoxWithDynamicPlaceholder 
                    inputRef={emailOrPhoneRef}
                    placeholder="Email/Phone"
                    width={360}
                    height={48}
                ></InputBoxWithDynamicPlaceholder>
                <div
                    className="relative flex flex-row"
                >
                    <InputBoxWithDynamicPlaceholder 
                        inputRef={passwordRef}
                        placeholder="Password"
                        width={360}
                        height={48}
                        options={{
                            type: passwordType,
                            style: {
                                paddingRight: 48
                            }
                        }}
                    ></InputBoxWithDynamicPlaceholder>
                    <div
                        className="absolute h-full aspect-square top-0 right-0 flex justify-center items-center"
                    >
                        {passwordType === 'text' ?
                        <Eye className="text-red-600 hover:text-blue-500" onClick={() => setPasswordType('password')} /> :
                        <EyeOff className="text-emerald-500 hover:text-amber-500" onClick={() => setPasswordType('text')} />}
                    </div>
                </div>
                <div className="relative flex flex-col w-90">
                    <div className="relative self-end flex flex-row whitespace-pre-wrap">
                        Don't have an account ? <div 
                            onClick={handleNavigateSignUp}
                            className="text-blue-500 select-none"
                        > Sign Up </div>
                    </div>
                </div>
                <button 
                    className="button-with-effect w-90 h-12"
                    onClick={async() => handleClickLogin()}
                >
                    <span>Login</span>
                </button>
            </div>
        </div>
    )
}