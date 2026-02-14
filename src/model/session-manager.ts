import { Session } from "./session.js"

export interface ISessionManager {

    /**
     * The title of the current session
     */
    getSessionTitle: () => string

    /**
     * Attempts to change the currently selected session's title to the given title
     * @param newTitle The new title of the current session
     * @throws Error if newTitle is an empty string or if newTitle is already in-use
     */
    setSessionTitle: (newTitle: string) => void

    /**
     * The model the current session is using
     */
    getSessionModel: () => string

    /**
     * Changes the currently selected session's model to the given model
     * @param newModel The new model of the current session
     */
    setSessionModel: (newModel: string) => void

    /**
     * Creates a new indexed session with the given title
     * @param defaultSessionTitle The title of every newly created session
     * @returns The title of the created session
     */
    createNewSession: (defaultSessionTitle: string) => string

    /**
     * Changes the currently selected session to one with the given title
     * @param sessionTitle The title of the session to switch to
     * @returns A boolean for success
     */
    selectNewSession: (sessionTitle: string) => boolean
}

export class SessionManager implements ISessionManager {

    private sessions: Map<string, Session> = new Map<string, Session>()
    private currentSession: Session

    public getSessionTitle = () => {
        return this.currentSession.title
    }

    public setSessionTitle = (newtitle: string) => {
        const isInvalidTitle = newtitle.trim().length == 0
        const sessionAlreadyNamedTitle = this.sessions.get(newtitle)
        const canChangeTitle = sessionAlreadyNamedTitle == undefined ? true : sessionAlreadyNamedTitle == this.currentSession
        const sessionExists = this.currentSession !== undefined

        if (isInvalidTitle) {
            throw new Error("Title can't be empty");
        }
        else if (sessionAlreadyNamedTitle) {
            throw new Error(`A session with the title ${newtitle} already exists`);
        }
        else if (canChangeTitle && sessionExists) {
            this.sessions.delete(this.currentSession.title)
            this.currentSession.title = newtitle
            this.sessions.set(newtitle, this.currentSession)
        }
    }

    public getSessionModel = () => {
        return this.currentSession.model
    }

    public setSessionModel = (newModel:string) => {
        this.currentSession.model = newModel
    }

    public createNewSession = (defaultSessiontitle: string) => {
        const sessiontitle = `${defaultSessiontitle} ${this.sessions.size + 1}`
        const newSession = new Session(sessiontitle, "")
        this.sessions.set(sessiontitle, newSession)

        return newSession.title
    }

    public selectNewSession = (sessiontitle: string) => {
        const selected = this.sessions.get(sessiontitle)
        const success = selected !== undefined
        
        if (success) {
            this.currentSession = selected
        }

        return success
    }
}