
/**
 * Stores information relevant to an AI query session
 */
export class Session {
    private _model: string;
    private _title : string;
    
    public get model() : string {
        return this._model;
    }

    /**
     * The model of the session
     */
    public set model (v : string) {
        this._model = v;
    }

    public get title() : string {
        return this._title;
    }

    /**
     * The title of the session
     * @throws If title's trimmed length == 0
     */
    public set title(v: string) {
        if (v.trim().length == 0) {
            throw new Error("Title can't be empty");
        }
        this._title = v;
    }

    /**
     * Initializes a new Session.
     * 
     * @param title The title of the session
     * @param model The model the session is using
     */
    constructor(title: string, model: string) {
        this.title = title
        this.model = model
    }
}