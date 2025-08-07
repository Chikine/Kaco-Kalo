import { useNavigate } from "react-router-dom"

export function VerificationPage() {

    const navigate = useNavigate()

    function handleNavigateLogin() {
        navigate('/login')
    }

    return (
        <div className="relative h-full aspect-square bg-transparent flex flex-col">
            <div className="relative h-1/2 flex justify-center">
                <div className="absolute top-3/7 left-1/2 -translate-y-1/2 -translate-x-1/2 w-50 aspect-square">
                    <img src={"/KacoKalo-remove-bg.png"} />
                </div>
                <div className="relative self-end flex flex-col text-center">
                    <div className="font-thin">Verify your account</div>
                </div>
            </div>
            <div className="relative h-full flex flex-col items-center mt-10 gap-5">
                <div className="text-5xl text-red-500">
                    Check Your Email To Verify Account
                </div>
                <div className="relative flex flex-row whitespace-pre-wrap">
                    <div 
                        onClick={handleNavigateLogin}
                        className="text-blue-500 select-none"
                    > Click here to go back to Login </div>
                </div>
            </div>
        </div>
    )
}