import { FlexDivSyncWithWindowSize } from "@/components/FlexDivSyncWithWindowSize";
import { LayerRoute } from "@/components/LayerRoute";
import { LayerProvider } from "@/contexts/LayerContext";
import { leftDivLayerStructure, rightDivLayerStructure } from "@/layers";
import { useState } from "react";

export function MainPage() {
    const [focusedOn, _setFocusedOn] = useState<'left' | 'right'>('left')

    return (
        <FlexDivSyncWithWindowSize
            focusedOn={focusedOn}
            childrenLeft={(
                <LayerProvider 
                    layerStructure={leftDivLayerStructure}
                >
                    <LayerRoute></LayerRoute>
                </LayerProvider>
            )}
            childrenRight={(
                <LayerProvider 
                    layerStructure={rightDivLayerStructure}
                >
                    <LayerRoute></LayerRoute>
                </LayerProvider>
            )}
        />
    )
}