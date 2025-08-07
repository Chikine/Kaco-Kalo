/* structures here */

import { LayerStructure } from "@/types"
import { Settings } from "./leftDiv/settings/Settings"
import { NotifySetting } from "./leftDiv/settings/NotifySetting"
import { StorageSetting } from "./leftDiv/settings/StorageSetting"
import { ChatList } from "./leftDiv/ChatList"
import { ChatContainer } from "./rightDiv/ChatContainer"
import { ChatCreator } from "./leftDiv/creator/ChatCreator"

export const settingsLayerStructure: LayerStructure = {
    element: <Settings/>,
    notify: {
        element: <NotifySetting/>
    },
    storage: {
        element: <StorageSetting/>
    }
}

export const leftDivLayerStructure: LayerStructure = {
    element: <ChatList/>,
    settings: settingsLayerStructure,
    creator: {
        element: <ChatCreator/>
    }
}

export const rightDivLayerStructure: LayerStructure = {
    element: <ChatContainer/>
}