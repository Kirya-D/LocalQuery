import { Ollama } from "ollama"
import { Session } from "./session.js"

/**
 * Stores information about all sessions
 */
export class SessionManager {

    private sessions: Map<string, Session> = new Map<string, Session>()
    private currentSession: Session | null = null
    private ollamaAPI: Ollama = new Ollama()

    /**
     * Returns the title of the session.
     * 
     * @returns The title of the current session
     * @throws If current session is null
     * @precondition current session != null
     */
    public getSessionTitle = (): string => {
        if (this.currentSession == null) {
            throw new Error("Session does not exist")
        }
        return this.currentSession.title
    }

    /**
     * Attempts to set the title of the current session to given title.
     * 
     * @param newTitle The new title to use for the session
     * @throws Set: If title is empty, or a session with this title already exists
     * @precondition current session !== null
     */
    public setSessionTitle = (newTitle: string) => {
        if (this.currentSession == null) {
            throw new Error("A session has not been selected yet")
        }

        if (!this.titleIsAvailable(newTitle)) {
            throw new Error(`A session with the title ${newTitle} already exists`)
        }

        this.sessions.delete(this.currentSession.title)
        this.currentSession.title = newTitle
        this.sessions.set(newTitle, this.currentSession)
    }

    /**
     * Returns the name of the AI model for the current session.
     * 
     * @throws If current session is null
     * @returns The model of the current session
     */
    public getSessionModel = (): string => {
        if (this.currentSession == null) {
            throw new Error("Session does not exist")
        }
        return this.currentSession.model
    }

    /**
     * Sets the AI model of the current session
     * 
     * @param newModel The name of the new AI model to use for the current session
     * @throws If current session is null
     * @postcondition this.getSessionModel() == newModel
     */
    public setSessionModel = (newModel: string): void => {
        if (this.currentSession == null) {
            throw new Error("Session does not exist")
        }
        this.currentSession.model = newModel
    }

    /**
     * Creates a new session with an indexed placeholder title.
     * 
     * @param defaultSessiontitle The placeholder title to use
     * @returns The title of the session
     */
    public createNewSession = (defaultSessiontitle: string): string => {
        let startIndex = this.sessions.size + 1

        while (true) {
            const sessionTitle = `${defaultSessiontitle} ${startIndex}`

            if (this.titleIsAvailable(sessionTitle)) {
                const newSession = new Session(sessionTitle)
                this.sessions.set(sessionTitle, newSession)

                return newSession.title
            }

            startIndex++
        }
    }

    private titleIsAvailable = (title: string): boolean => {
        return !this.sessions.has(title)
    }

    /**
     * Changes the current active session to the session with the given title and returns a bool for success.
     * 
     * @param sessiontitle The title of the session to switch to
     * @returns True if a session with the given title is found otherwise False
     * @postcondition If session is found this.getSessionTitle() == session.title && this.getSessionModel() == session.model
     */
    public switchToSession = (sessiontitle: string): boolean => {
        const selected = this.sessions.get(sessiontitle)
        const success = selected !== undefined
        
        if (success) {
            this.currentSession = selected
        }

        return success
    }

    /**
     * Sends a query to the current session's model and returns its response.
     * Stores the query and response information in the session
     * 
     * @param query The content to query
     * @returns The model's response
     * @precondition Current session !== null
     * @throws If current session is null
     */
    public queryModel = async (query: string) => {
        if (this.currentSession == null) {
            throw new Error("Session does not exist")
        }
        
        const chatRequest = {
            "model": this.getSessionModel(),
            "messages": [{
                "role": "user",
                "content": query
            }],
        }

        const chatResponse = await this.ollamaAPI.chat(chatRequest)
        const responseContent = chatResponse.message.content

        this.currentSession.addMessageExchange(query, responseContent)
        return responseContent
    }
}