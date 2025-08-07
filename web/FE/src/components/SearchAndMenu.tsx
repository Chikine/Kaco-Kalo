import { useBoxSize } from "@/hooks/contentSize/useBoxSize"
import { useEffect, useRef } from "react"
import { Menu, Search } from "lucide-react"
import { useLayer } from "@/hooks/useLayer"
import { useLeftDivWidth } from "@/hooks/useLeftDivWidth"

export function SearchAndMenu() {
    const divRef = useRef<HTMLDivElement>(null)
    const divSize = useBoxSize(divRef)

    const { nextLayer, layerLocation } = useLayer()

    const { preventShrink, backToDefault } = useLeftDivWidth()

    function isDivWidthNarrow() {
        return divSize.width < 290
    }

    function showMenu() {
        nextLayer('settings')
    }

    useEffect(() => {
        //if currently setting
        if(layerLocation !== '/') {
            preventShrink()
        } else {
            backToDefault()
        }
    }, [layerLocation])
    
    return (
        <div ref={divRef}
            className="absolute 0 top-0 left-0 w-full h-full flex flex-row"
        >
            <div
                className="relative h-full aspect-square"
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-1/2 h-8 w-8 rounded-2xl flex justify-center items-center hover:bg-blue-200/50 transition-all duration-150"
                    onClick={showMenu}
                >
                    <Menu size={24} />
                </div>
            </div>
            <div
                className="relative w-full h-full flex flex-col justify-center items-center"
            >
                {divSize.width > 100 && <div
                    className={"relative h-8 transition-all duration-300 self-start flex flex-col"}
                    style={{
                        width: isDivWidthNarrow() ? 32 : 'calc(100% - 20px)'
                    }}
                >
                    <div 
                        className="relative self-start h-full aspect-square flex justify-center items-center"
                    >
                        <Search size={20} />
                    </div> 
                    <input
                        className={"absolute top-0 left-0 h-full w-full bg-transparent" + " "
                            + (isDivWidthNarrow() ? " " : " pl-8 pr-4 ")
                            + "border-2 border-emerald-100  rounded-2xl" + " "
                            + "hover:border-emerald-200" + " "
                            + "focus:outline-none focus:border-emerald-400"
                        }
                    />
                </div>}
            </div>
        </div>
    )
}

/* previous entries */

/*
const { setPopup, hidePopup, showPopup, setPopupSize } = usePopup()

//if div is narrow show popup of menu
const structure = settingsLayerStructure

function onClose() {
    hidePopup()
    setPopupSize({width: 0, height:0})
}

structure.element = <Settings onClose={onClose}/>

const menu = (
    <LayerProvider layerStructure={structure}>
        <LayerRoute/>
    </LayerProvider>
)
setPopup(menu)
setPopupSize({
    width: 400,
    height: 600
})
showPopup() */