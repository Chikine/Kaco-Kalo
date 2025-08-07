import { useAuth } from "@/hooks/useAuth"
import { useColors } from "@/hooks/useColors"
import { useLayer } from "@/hooks/useLayer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function Settings({onClose} : {onClose?: () => any}) {
    const colors = useColors()
    
    const { prevLayer } = useLayer()

    const { trySignOut } = useAuth()

    const navigate = useNavigate()

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex flex-col"
            style={{
                backgroundColor: colors.LAYER_CONTAINER_COLOR
            }}
        >
            <div
                onClick={() => onClose?.() || prevLayer()}
            >back</div>
            <div>Settings layer here</div>
            <div>In development ._.</div>
            <div
                onClick={async() => {
                    await trySignOut('local')
                    toast('successfully sign out!', {
                        onClose: () => {
                            navigate('/')
                        }
                    })
                }}
            >test sign out locally here</div>
        </div>
    )
}