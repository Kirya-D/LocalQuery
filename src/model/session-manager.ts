import { Session } from "./session.js"

/**
 * Stores information about all sessions
 */
export class SessionManager {

    private sessions: Map<string, Session> = new Map<string, Session>()
    private currentSession: Session

    /**
     * Returns the title of the session.
     * @returns The title of the current session
     */
    public getSessionTitle = (): string => {
        return this.currentSession.title
    }

    /**
     * Attempts to set the title of the current session to given title.
     * @param newTitle The new title to use for the session
     * @throws If title is empty or a session with this title already exists
     */
    public setSessionTitle = (newtitle: string) => {
        const sessionAlreadyNamedTitle = this.sessions.get(newtitle)
        const canChangeTitle = sessionAlreadyNamedTitle == undefined ? true : sessionAlreadyNamedTitle == this.currentSession
        const sessionExists = this.currentSession !== undefined

        if (sessionAlreadyNamedTitle) {
            throw new Error(`A session with the title ${newtitle} already exists`);
        }
        else if (canChangeTitle && sessionExists) {
            this.currentSession.title = newtitle
            this.sessions.delete(this.currentSession.title)
            this.sessions.set(newtitle, this.currentSession)
        }
    }

    /**
     * Returns the name of the AI model for the current session.
     * 
     * @returns The model of the current session
     */
    public getSessionModel = (): string => {
        return this.currentSession.model
    }

    /**
     * 
     * @param newModel The name of the new AI model to use for the current session
     */
    public setSessionModel = (newModel:string): void => {
        this.currentSession.model = newModel
    }

    /**
     * Creates a new session with an indexed placeholder title.
     * 
     * @param defaultSessiontitle The placeholder title to use
     * @returns The title of the session
     */
    public createNewSession = (defaultSessiontitle: string): string => {
        const sessiontitle = `${defaultSessiontitle} ${this.sessions.size + 1}`
        const newSession = new Session(sessiontitle, "")
        this.sessions.set(sessiontitle, newSession)

        return newSession.title
    }

    /**
     * Changes the current active session to the session with the given title and returns a bool for success.
     * 
     * @param sessiontitle The title of the session to switch to
     * @returns True if a session with the given title is found otherwise False
     */
    public switchToSession = (sessiontitle: string): boolean => {
        const selected = this.sessions.get(sessiontitle)
        const success = selected !== undefined
        
        if (success) {
            this.currentSession = selected
        }

        return success
    }
}