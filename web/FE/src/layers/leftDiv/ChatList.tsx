import { ChatListContainer } from "@/components/ChatListContainer"
import { SearchAndMenu } from "@/components/SearchAndMenu"
import { useColors } from "@/hooks/useColors"
import { useLayer } from "@/hooks/useLayer"
import { Pencil } from "lucide-react"

export function ChatList() {
    const colors = useColors()

    const { nextLayer } = useLayer()

    function toCreateLayer() {
        nextLayer('creator')
    }

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex flex-col"
            style={{ 
                backgroundColor: colors.LAYER_CONTAINER_COLOR
            }}
        >
            <div 
                className="relative h-18 w-full flex flex-row border-2 border-blue-500"
            >
                <SearchAndMenu/>
            </div>
            <div 
                className="relative w-full h-full flex flex-col border-2 border-blue-500"
            > 
                <ChatListContainer/>
            </div>
            <button 
                className="absolute bottom-10 right-4 w-12 h-12 flex whitespace-pre-wrap rounded-xl bg-black/60 justify-center items-center"
                onClick={toCreateLayer}
            >
                <Pencil className="text-blue-400 " />
            </button>
        </div>
    )
}