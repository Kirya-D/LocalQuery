import { contextBridge } from "electron"
import { IndexPageIds } from "../constants/index-page-ids.js"
import { Visibility } from "../constants/visibility.js"
import { IndexViewmodel } from "../viewmodel/index.js"

export const constantsAPI = {
    index: IndexPageIds,
    visibility: Visibility
}

const indexVM = new IndexViewmodel();

export const viewmodelsAPI = {
    index: indexVM
}

contextBridge.exposeInMainWorld("constants", constantsAPI)
contextBridge.exposeInMainWorld("viewmodels", viewmodelsAPI)