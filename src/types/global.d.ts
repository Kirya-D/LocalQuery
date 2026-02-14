import { Ollama } from "ollama"
import { IIndexPageIds } from "../constants/index-ids.js"
import { IVisibility } from "../constants/visibility.js"
import { ISessionManager } from "../model/session-manager.js"

interface constantsAPI {
    visibility: IVisibility
    indexId: IIndexPageIds
}

declare global {
    interface Window {
        constants: constantsAPI
        model: {
            sessionManager: ISessionManager
        }
        ollama: Ollama
    }
}

export { }

