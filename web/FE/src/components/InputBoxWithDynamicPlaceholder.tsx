import { useColors } from "@/hooks/useColors"
import { useEffect, useState, RefObject, useRef } from "react"

export function InputBoxWithDynamicPlaceholder({width, height, placeholder, inputRef, options}: {width: number | string, height: number | string, placeholder?: string, inputRef: RefObject<string>, options?: object}) {
    const [userInput, setUserInput] = useState<string>('')

    const [isFocus, setIsFocus] = useState<boolean>(false)

    const COLORS = useColors()

    useEffect(() => {
        if(userInput) {
            inputRef.current = userInput
        }
    }, [userInput])

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
            e.preventDefault()
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value
        setUserInput(input)
    }

    const labelRef = useRef<HTMLLabelElement>(null)

    useEffect(() => {
        const lc = labelRef.current
        if(lc) {
            if(isFocus || userInput) {
                lc.style.scale = '0.85'
                lc.style.top = '0'
            }
            else {
                lc.style.scale = '1'
                lc.style.top = '50%'
            }
        }
    }, [isFocus])
    
    return (
        <div
            className="relative flex items-center"
            style={{
                width,
                height
            }}
        >
            <input
                className={"relative w-full h-full overflow-hidden whitespace-pre-wrap pl-2 pr-2 pt-2 rounded-2xl ring-2 ring-neutral-500 opacity-50 overflow-x-auto" 
                        +  "hover:opacity-75 hover:ring-fuchsia-500 hover:border-fuchsia-500"
                        +  "focus:ring-3 focus:opacity-100 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"}
                style={{border: 'none'}}
                onKeyDown={handleKeyDown}
                value={userInput}
                onChange={handleChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...options}
            />
            <label ref={labelRef}
                className={"absolute left-0 -translate-y-1/2 self-start ml-5 bg-inherit pl-1 pr-1"}
                style={{
                    transition: 'all 0.2s ease-in-out',
                    top: '50%',
                    backgroundColor: COLORS.BG_COLOR
                }}
            >
                {placeholder}
            </label>
        </div>
    )
}