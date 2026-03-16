import { Ollama } from "ollama"
import { SessionManager } from "../model/session-manager"

/**
 * Index html/view Viewmodel.
 */
export class IndexViewmodel {

    private _sessionTitle: string = ""
    private _sessionModel: string = ""
    private _sessionManager: SessionManager = new SessionManager()
    private _ollamaAPI: Ollama = new Ollama()

    public get sessionTitle(): string {
        return this._sessionTitle
    }

    /**
     * The title of the current session.
     * 
     * @throws If title is empty or a session with the given title already exists
     */
    public set sessionTitle(newTitle: string) {
        this._sessionTitle = newTitle
        this._sessionManager.setSessionTitle(newTitle)
    }

    public get sessionModel(): string {
        return this._sessionModel
    }

    /**
     * The name of the AI model for the current session.
     */
    public set sessionModel(newModel: string) {
        this._sessionManager.setSessionModel(newModel)
    }

    /**
     * Opens a session with the given name and returns a boolean for success.
     * 
     * @param sessionTitle The title of the session to open
     * @returns True if a session with the given title is found otherwise False
     */
    public OpenSession = (sessionTitle: string): boolean => {
        const success = this._sessionManager.switchToSession(sessionTitle)

        return success
    }

    /**
     * Creates and opens a new session with an indexed placeholder title.
     * 
     * @param placeholderTitle — The placeholder title to use
     * @returns — The title of the session
     */
    public createNewSession = (placeholderTitle: string): string => {
        const newSessionTitle = this._sessionManager.createNewSession(placeholderTitle)
        this.OpenSession(newSessionTitle)

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
}