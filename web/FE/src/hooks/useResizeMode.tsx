import { useEffect, useState } from "react"
import { useWindowSize } from "./contentSize/useWindowSize"

const options = {
    expandToNarrow: 560,
    narrowToExpand: 600
}

export function useResizeMode() {
    const [resizeMode, setResizeMode] = useState<'narrow' | 'expand'>('narrow')

    const {width: windowWidth} = useWindowSize()
    
    useEffect(() => {
        if(resizeMode === 'expand' && windowWidth <= options.expandToNarrow) {
            setResizeMode('narrow')
        }
        
        if(resizeMode === 'narrow' && windowWidth >= options.narrowToExpand) {
            setResizeMode('expand')
        }
    }, [windowWidth])

    return resizeMode
}