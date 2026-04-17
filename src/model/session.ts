import { MessageExchange } from "./message-exchange"

/**
 * Stores information relevant to an AI query session
 */
export class Session {

    private _model: string
    private _title: string
    private _messageHistory: Array<MessageExchange>
    
    public get model() : string {
        return this._model
    }

    /**
     * The model of the session
     */
    public set model (v : string) {
        this._model = v
    }

    public get title() : string {
        return this._title
    }

    /**
     * The title of the session
     * 
     * @throws Set: If title's trimmed length == 0
     * @precondition Set: newTitle.trim().length > 0
     */
    public set title(v: string) {
        if (v.trim().length == 0) {
            throw new Error("Title can't be empty")
        }
        this._title = v
    }

    public get messageHistory() {
        const deepCopy = new Array<MessageExchange>()

        this._messageHistory.forEach((exchange) => {
            deepCopy.push(Object.assign({}, exchange))
        })

        return deepCopy
    }

    /**
     * Initializes a new Session.
     * 
     * @param title The title of the session
     * @param model The model the session is using
     * @throws If title.trim().length == 0
     * @precondition title.trim().length > 0
     * @postcondition this.title == title && model == this.model
     */
    constructor(title: string, model: string = "Select a model") {
        this.title = title
        this.model = model
        this._messageHistory = new Array<MessageExchange>()
    }

    public addMessageExchange = (query: string, response: string) => {
        const newExchange = new MessageExchange(query, response)
        this._messageHistory.push(newExchange)
    }
}