import { Ollama } from "ollama"
import { SessionManager } from "../model/session-manager"

/**
 * Index html/view Viewmodel.
 */
export class IndexViewmodel {

    private _sessionManager: SessionManager = new SessionManager()
    private _ollamaAPI: Ollama = new Ollama()

    public getSessionTitle = (): string => {
        return this._sessionManager.getSessionTitle()
    }

    /**
     * The title of the current session.
     * 
     * @throws Get: If current session is null
     * @throws Set: If title is empty or a session with the given title already exists
     */
    public setSessionTitle = (newTitle: string) => {
        this._sessionManager.setSessionTitle(newTitle)
    }

    public getSessionModel = (): string => {
        return this._sessionManager.getSessionModel()
    }   

    /**
     * The name of the AI model for the current session.
     * 
     * @precondition Current session !== null
     * @throws If current session is null
     */
    public setSessionModel = (newModel: string) => {
        this._sessionManager.setSessionModel(newModel)
    }

    /**
     * Opens a session with the given name and returns a boolean for success.
     * 
     * @param sessionTitle The title of the session to open
     * @returns True if a session with the given title is found otherwise False
     */
    public openSession = (sessionTitle: string): boolean => {
        const success = this._sessionManager.switchToSession(sessionTitle)
        return success
    }

    /**
     * Creates and opens a new session with an indexed placeholder title.
     * 
     * @param placeholderTitle The placeholder title to use
     * @returns The title of the session
     * @postcondition this.sessionTitle == returned title
     */
    public createNewSession = (placeholderTitle: string): string => {
        const newSessionTitle = this._sessionManager.createNewSession(placeholderTitle)
        this.openSession(newSessionTitle)

        return newSessionTitle
    }

    /**
     * Returns a list of local AI models.
     * 
     * @returns A list of the found models
     */
    public getModelList = async () => {
        const listedModels = await this._ollamaAPI.list()
        return listedModels.models
    }

    /**
     * Queries the current session's model and returns its response
     * 
     * @param query The content to query
     * @returns The model's response
     * @precondition Current session !== null
     * @throws If current session is null
     */
    public sendQuery = async (query: string) => {
        const chatRequest = {
            "model": this.getSessionModel(),
            "messages": [{
                "role": "user",
                "content": query
            }],
        }

        const chatResponse = await this._ollamaAPI.chat(chatRequest)

        return chatResponse.message.content
    }
}