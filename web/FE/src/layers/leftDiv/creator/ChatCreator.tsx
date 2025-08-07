import { getUserProfile } from "@/api/profileApi"
import { useChat } from "@/hooks/useChat"
import { useColors } from "@/hooks/useColors"
import { useLayer } from "@/hooks/useLayer"
import { Chat } from "@/types"
import { toast } from "react-toastify"

export function ChatCreator() {
    const colors = useColors()

    const { prevLayer } = useLayer()

    const { newChat } = useChat()

    async function _testCreateNewChat() {
        const chat_id = crypto.randomUUID()

        const testChat: Partial<Chat> = {
            name: 'chat - ' + chat_id ,
            status: 'active',
            id: chat_id
        }

        const p1 = await getUserProfile('55da9e09-7441-4ee0-a5b5-875cb77e3916')

        const p2 = await getUserProfile('407f3273-c8d3-40db-b00e-ea41f316f34d')

        const testProfiles = [p1,p2].filter(p => !!p)

        await newChat(testChat, testProfiles)

        toast.success('successful create chat')
    }

    return (
        <div
            className="absolute left-0 top-0 w-full h-full flex flex-col"
            style={{backgroundColor: colors.LAYER_CONTAINER_COLOR}}
        >
            <div onClick={prevLayer}>back</div>
            <div>create chat here (in development)</div>
            <div onClick={_testCreateNewChat}>test create new chat</div>
        </div>
    )
}