import { contextBridge } from "electron"
import { marked } from "marked"
import { ChatRequest, Ollama } from "ollama"
import { IndexPageIds } from "../constants/index-ids.js"
import { Visibility } from "../constants/visibility.js"
import { SessionManager } from "../model/session-manager.js"

var newOllama = new Ollama()
var newSessionManager = new SessionManager()

var ollamaAPI = {
    list: () => newOllama.list(),
    chat: (chatRequest: ChatRequest & {stream?}) => newOllama.chat(chatRequest)
}

var constantsAPI = {
    visibility: Visibility,
    indexId: IndexPageIds
}

var modelAPI = {
    sessionManager: newSessionManager
}

contextBridge.exposeInMainWorld("constants", constantsAPI)
contextBridge.exposeInMainWorld("model", modelAPI)
contextBridge.exposeInMainWorld("ollama", ollamaAPI)