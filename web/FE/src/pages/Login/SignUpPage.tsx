import { InputBoxWithDynamicPlaceholder } from "@/components/InputBoxWithDynamicPlaceholder";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignUpPage() {

    const emailRef = useRef<string>('')
    const firstNameRef = useRef<string>('')
    const lastNameRef = useRef<string>('')
    const passwordRef = useRef<string>('')

    const [emailNotValidReason, setEmailNotValidReason] = useState<string>('')

    const [passwordNotValidReason, setPasswordNotValidReason] = useState<string>('')

    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password')

    useEffect(() => {
        function checkValid() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if(emailRef.current) {
                if(emailPattern.test(emailRef.current)) {
                    setEmailNotValidReason('')
                }
                else {
                    setEmailNotValidReason('invalid email!')
                }
            }
            else {
                setEmailNotValidReason('email cannot be blank!')
            }

            if(passwordRef.current) {
                if(passwordRef.current.length < 8) {
                    setPasswordNotValidReason('password length must be larger than 7')
                }
                else if(!/[a-zA-Z]/.test(passwordRef.current)) {
                    setPasswordNotValidReason('password must contain at least 1 character')
                }
                else if(!/\d/.test(passwordRef.current)) {
                    setPasswordNotValidReason('password must contain at least 1 digit')
                }
                else {
                    setPasswordNotValidReason('')
                }
            }
            else {
                setPasswordNotValidReason('password cannot be blank!')
            }
        }

        const interval = setInterval(checkValid, 200)

        return () => clearInterval(interval)
    }, [])

    const { trySignUp } = useAuth()

    const navigate = useNavigate()

    function handleNavigateLogin() {
        navigate('/login')
    }

    async function handleClickSignUp() {
        console.log('click')

        const isValid = [emailRef, firstNameRef, lastNameRef, passwordRef].every(ref => !!ref.current.trim())
        && !emailNotValidReason && !passwordNotValidReason

        if(isValid) {
            console.log('valid')
            
            const data = {
                email: emailRef.current,
                first_name: firstNameRef.current,
                last_name: lastNameRef.current
            }

            const user = await trySignUp(emailRef.current, passwordRef.current, data)
            if(user) {
                toast.success('successfully sign up', {
                    onClose: () => {
                        //on close navigate to verify page
                        navigate('/verification')
                    }
                })   
            }
        }
    }

    return (
        <div className="relative h-full aspect-square bg-transparent flex flex-col">
            <div className="relative h-1/3 flex justify-center mt-3">
                <div className="absolute top-3/7 left-1/2 -translate-y-1/2 -translate-x-1/2 w-40 aspect-square">
                    <img src={"/KacoKalo-remove-bg.png"} />
                </div>
                <div className="relative self-end flex flex-col text-center">
                    <div className="font-thin">Sign up new kacokalo account</div>
                </div>
            </div>
            <div className="relative h-full flex flex-col items-center mt-3 gap-5">
                <InputBoxWithDynamicPlaceholder 
                    inputRef={emailRef}
                    placeholder="Email"
                    width={360}
                    height={48}
                ></InputBoxWithDynamicPlaceholder>
                {emailNotValidReason &&
                    <div className="relative flex flex-col w-90 text-right text-xs">{emailNotValidReason}</div>
                }
                <InputBoxWithDynamicPlaceholder 
                    inputRef={firstNameRef}
                    placeholder="First Name"
                    width={360}
                    height={48}
                ></InputBoxWithDynamicPlaceholder>
                <InputBoxWithDynamicPlaceholder 
                    inputRef={lastNameRef}
                    placeholder="Last Name"
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
                {passwordNotValidReason &&
                    <div className="relative flex flex-col w-90 text-right text-xs">{passwordNotValidReason}</div>
                }
                <div className="relative flex flex-col w-90">
                    <div className="relative self-end flex flex-row whitespace-pre-wrap">
                        Already have an account ? <div 
                            onClick={handleNavigateLogin}
                            className="text-blue-500 select-none"
                        > Login </div>
                    </div>
                </div>
                <button 
                    className="button-with-effect w-90 h-12"
                    onClick={async() => handleClickSignUp()}
                >
                    <span>Sign Up</span>
                </button>
            </div>
        </div>
    )
}