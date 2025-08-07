import { useLayer } from "@/hooks/useLayer";
import { JSX, useEffect, useState } from "react";

const options = {
    offset: '-40%',
    duration: 0.4,
    easing: 'ease-out'
}

export function LayerRoute() {
    const { layer, action } = useLayer()

    const [displayLayer, setDisplayLayer] = useState<JSX.Element>(layer)

    const [direction, setDirection] = useState<'left' | 'right' | 'neutral'>('neutral')

    useEffect(() => {
        if(displayLayer !== layer) {
            if(action.current === 'next') {
                //next layer animate (left move)
                setDirection('left')
            }
            else {
                //prev layer animate (right move)
                setDirection('right')
            }
        }
    }, [layer])

    useEffect(() => {
        if(direction !== 'neutral') {
            const timeout = setTimeout(() => {
                setDirection('neutral')
                setDisplayLayer(layer)
            }, options.duration * 1000)

            return () => clearTimeout(timeout)
        }
    }, [direction])

    return ( 
        <div 
            className="absolute top-0 left-0 flex w-full h-full overflow-hidden"
        >
            <div 
                className={'absolute top-0 w-full h-full flex z-1 transition-all '
                    + options.easing}
                style={{
                    transitionDuration: direction === 'neutral' ? '0s' : options.duration + 's',
                    left: direction === 'right' ? 0 : options.offset
                }}
            >{direction !== 'neutral' && layer}</div>
            <div 
                className={'absolute top-0 w-full h-full flex z-2 transition-all '
                    + options.easing}
                style={{
                    transitionDuration: direction === 'neutral' ? '0s' : options.duration + 's',
                    left: direction !== 'left' ? direction === 'neutral' ? 0 : '100%' : options.offset
                }}
            >{displayLayer}</div>
            <div 
                className={'absolute top-0 w-full h-full flex z-3 transition-all '
                    + options.easing}
                style={{
                    transitionDuration: direction === 'neutral' ? '0s' : options.duration + 's',
                    left: direction === 'left' ? 0 : '100%'
                }}
            >{direction !== 'neutral' && layer}</div>
        </div>
    )
}