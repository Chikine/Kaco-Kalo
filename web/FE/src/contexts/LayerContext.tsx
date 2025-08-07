import { LayerContextValue, LayerStructure } from "@/types";
import { createContext, JSX, ReactNode, useEffect, useRef, useState } from "react";

export const LayerContext = createContext<LayerContextValue | null>(null)

export function LayerProvider({children, layerStructure}: {children: ReactNode, layerStructure: LayerStructure}) {
    const [layer, setLayer] = useState<JSX.Element>(layerStructure['element'])
    
    const [layerLocation, setLayerLocation] = useState<string>('/')

    const [prevLayerLocations, setPrevLayerLocations] = useState<string[]>([])

    const action = useRef<'prev' | 'next'>('next')

    function tryReachLocation(location: string) {
        try {
            const [_, ...paths] = location.split('/')
            let res: any = layerStructure
            paths.forEach(path => {
                if(path) {
                    res = res?.[path] || null
                }
            })

            return res?.element as JSX.Element | null
        } catch (e) {
            return null
        }
    }

    useEffect(() => {
        const layer = tryReachLocation(layerLocation)
        if(layer) {
            setLayer(layer)
        }
    }, [layerLocation])

    function nextLayer(layerName: string){
        const location = layerLocation + (layerLocation === '/' ? '' : '/') + layerName

        const isValid = !!tryReachLocation(location)

        if(isValid) {
            action.current = 'next'
            setPrevLayerLocations(prev => [...prev, layerLocation])
            setLayerLocation(location)
        }
    }

    function prevLayer() {
        if(!prevLayerLocations.length) return

        const [location] = prevLayerLocations.slice(-1)

        action.current = 'prev'

        setLayerLocation(location)

        setPrevLayerLocations(prev => {
            prev.pop()
            return prev
        })
    }

    function navigateLayer(location: string) {
        const isValid = location !== layerLocation && !!tryReachLocation(location)

        if(isValid) {
            action.current = 'next'
            setPrevLayerLocations(prev => [...prev, layerLocation])
            setLayerLocation(location)
        }
    }

    return (
        <LayerContext.Provider 
            value={{ 
                layer, 
                layerLocation, 
                action,
                nextLayer, 
                prevLayer, 
                navigateLayer 
            }}
        >
            {children}
        </LayerContext.Provider>
    )
}