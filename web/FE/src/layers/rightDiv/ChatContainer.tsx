import { useColors } from "@/hooks/useColors"

export function ChatContainer() {
    const colors = useColors()

    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col">
            <div 
                className="relative w-full h-18 flex flex-row border-2 border-blue-500"
                style={{
                    backgroundColor: colors.LAYER_CONTAINER_COLOR
                }}
            > bar here </div>
            <div className="relative w-full h-full flex flex-col border-2 border-blue-500 bg-black"> chat here </div>
        </div>
    )
}