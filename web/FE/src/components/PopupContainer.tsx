import { usePopup } from "@/hooks/usePopup";

export function PopupContainer() {
    const { popup, isVisible, popupSize } = usePopup()

    if(!isVisible) {
        return <></>
    }

    return (
        <div
            className="absolute top-0 left-0 w-full h-full z-1000 bg-black/50 flex justify-center items-center"
        >
            <div
                className="relative w-auto h-auto rounded-4xl overflow-hidden p-2"
                style={{
                    width: popupSize.width || '100%',
                    height: popupSize.height || '100%'
                }}
            >
                {popup}
            </div>
        </div>
    )
}