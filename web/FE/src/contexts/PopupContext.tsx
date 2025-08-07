import { createContext, JSX, ReactNode, useState } from "react"

export type PopupContextValue = { 
    popup: JSX.Element | null
    setPopup: React.Dispatch<React.SetStateAction<JSX.Element | null>>
    popupSize: {width: number,height: number}
    setPopupSize: React.Dispatch<React.SetStateAction<{width: number,height: number}>>
    isVisible: boolean
    hidePopup: () => void
    showPopup: () => void
}

export const PopupContext = createContext<PopupContextValue | null>(null)

export function PopupProvider({children} : {children: ReactNode}) {
    const [popup, setPopup] = useState<JSX.Element| null>(null)

    const [isVisible, setIsVisible] = useState(false)

    const [popupSize, setPopupSize] = useState({width: 0, height: 0})

    function hidePopup() {
        setIsVisible(false)
    }

    function showPopup() {
        setIsVisible(true)
    }

    return (
        <PopupContext.Provider
            value={{
                popup,
                setPopup,
                popupSize,
                setPopupSize,
                isVisible,
                hidePopup,
                showPopup
            }}
        >
            {children}
        </PopupContext.Provider>
    )
}