import { useLeftDivWidth } from "@/hooks/useLeftDivWidth";
import { useResizeMode } from "@/hooks/useResizeMode";
import { JSX } from "react";

export function FlexDivSyncWithWindowSize({childrenLeft, childrenRight, focusedOn}: {childrenLeft: JSX.Element, childrenRight: JSX.Element, focusedOn: 'left' | 'right'}) {
    const resizeMode = useResizeMode()

    const {leftDivWidth, isResizing, setIsResizing} = useLeftDivWidth()

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex flex-row items-start"
        >
            <div
                style={{
                    position: 'relative',
                    width: resizeMode === 'narrow' ? '100%' : leftDivWidth,
                    height: '100%',
                    display: (resizeMode === 'expand' || focusedOn === 'left') ? 'block' : 'none',
                    border: '1px black solid',
                    transition: isResizing ? 'none' : 'all 0.5s' 
                }}
            >
                {childrenLeft}
            </div>
            {resizeMode === 'expand' && <div
                className={`relative h-full w-1 bg-emerald-500 cursor-col-resize 
                    hover:bg-yellow-300`
                }
                onMouseDown={() => setIsResizing(true)}
            ></div>}
            <div
                style={{
                    position: 'relative',
                    width: 'calc(100% - ' + leftDivWidth + 'px)',
                    height: '100%',
                    display: (resizeMode === 'expand' || focusedOn === 'right') ? 'block' : 'none',
                    border: '1px black solid',
                    transition: isResizing ? 'none' : 'all 0.5s' 
                }}
            >
                {childrenRight}
            </div>
        </div>
    )
}