import { Session } from "./session.js"

export interface ISessionManager {

    /**
     * The title of the current session
     */
    sessionTitle: () => string

    /**
     * The model the current session is using
     */
    sessionModel: () => string

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

    /**
     * Attempts to change the currently selected session's title to the given title
     * @param newtitle The new title of the current session
     * @returns A boolean for success (false if the title already exists on another session)
     * @throws Error if newtitle is an empty string or if newtitle is already in-use
     */
    changeSessionTitle: (newtitle: string) => void
}

export class SessionManager implements ISessionManager {

    private sessions: Map<string, Session> = new Map<string, Session>()
    private currentSession: Session

    public sessionTitle = () => {
        return this.currentSession.title
    }

    public sessionModel = () => {
        return this.currentSession.model
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

    public changeSessionTitle = (newtitle: string) => {
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
}