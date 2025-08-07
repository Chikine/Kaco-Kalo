import { useLayoutEffect, useState } from "react";

/**
 * use size of a html element reference
 * @example
 * const rootRef = useRef(document.getElementById('root'))
 * const rootSize = useBoxSize(rootRef)
 * //rootSize will now return size of root 
 */
export function useBoxSize(ref: React.RefObject<HTMLElement | null>) {
    const [boxSize, setBoxSize] = useState({ width: 0, height: 0 })

    useLayoutEffect(() => {
        const element = ref.current
        if (!element) return
        else {
            const rect = element.getBoundingClientRect()
            setBoxSize({ width: rect.width, height: rect.height })
        }

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            setBoxSize({ width, height })
        })

        observer.observe(element)
        return () => observer.disconnect()
    }, [ref])

    return boxSize
}
