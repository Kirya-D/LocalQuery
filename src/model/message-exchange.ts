
/**
 * Stores information about a user/model exchange
 */
export class MessageExchange {

    private _query: string
    private _response: string

    /**
     * The query from the user
     */
    public get query() {
        return this._query
    }

    /**
     * The response from the model
     */
    public get response() {
        return this._response
    }

    /**
     * Initializes a new MessageExchange
     * 
     * @param query The user's query
     * @param response The model's response
     */
    constructor(query: string, response: string) {
        this._query = query
        this._response = response
    }
}