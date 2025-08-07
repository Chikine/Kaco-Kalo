import { clamp } from "@/helpers";
import { useMouse } from "@/hooks/useMouse";
import { LeftDivWidthContextValue } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const LeftDivWidthContext = createContext<LeftDivWidthContextValue | null>(null)

export function LeftDivWidthProvider({children}: {children:ReactNode}) {
    const [leftDivWidth, setLeftDivWidth] = useState(400)

    const [isResizing, setIsResizing] = useState(false)

    const [minWidth, setMinWidth] = useState(80)

    const mouse = useMouse()

    useEffect(() => {
        if(isResizing) {
            const interval = setInterval(() => {
                if(mouse.current.isMouseDown) {
                    setLeftDivWidth(clamp(mouse.current.x, minWidth, 450))
                } else {
                    setIsResizing(false)
                }
            }, 30)

            return () => clearInterval(interval)
        }
    }, [isResizing])

    useEffect(() => {
        const w = clamp(minWidth, 80, 450)
        if(w === minWidth) {
            setLeftDivWidth(clamp(leftDivWidth, minWidth, 450))
        } else {
            setMinWidth(w)
        }
    }, [minWidth])

    function preventShrink() {
        setMinWidth(300)
    }

    function backToDefault() {
        setMinWidth(80)
    }

    return (
        <LeftDivWidthContext.Provider
            value={{
                leftDivWidth, 
                setMinWidth, 
                isResizing,
                setIsResizing, 
                preventShrink, 
                backToDefault
            }}
        >
            {children}
        </LeftDivWidthContext.Provider>
    )
}