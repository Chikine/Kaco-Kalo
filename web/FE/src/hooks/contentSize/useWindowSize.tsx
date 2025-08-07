import { useEffect, useState } from "react";

/**
 * use window current size 
 */
export function useWindowSize() {

    const [width, setWidth] = useState<number>(0)

    const [height, setHeight] = useState<number>(0)

    const [percentWidth, setPercentWidth] = useState<number>(0)

    const [percentHeight, setPercentHeight] = useState<number>(0)

    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
            setPercentWidth(window.innerWidth / screen.width)
            setPercentHeight(window.innerWidth / screen.width)
        }

        onResize()

        window.addEventListener('resize', onResize)

        return () => (
            window.removeEventListener('resize', onResize)
        )
    }, [])

    return {width, height, percentWidth, percentHeight}
}

