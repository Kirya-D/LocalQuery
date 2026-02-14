import { contextBridge } from "electron"
import { IndexPageIds } from "../constants/index-ids.js"
import { Visibility } from "../constants/visibility.js"
import { SessionManager } from "../model/session-manager.js"

var newSessionManager = new SessionManager()

var constantsAPI = {
    visibility: Visibility,
    indexId: IndexPageIds
}

var modelAPI = {
    sessionManager: newSessionManager
}

contextBridge.exposeInMainWorld("constants", constantsAPI)
contextBridge.exposeInMainWorld("model", modelAPI)