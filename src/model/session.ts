export interface ISession {
    /**
     * The title of the session; can not be empty
     * @throws Error when attempting to set title to an empty string
     */
    title: string

    /**
     * The model in-use
     */
    model: string
}

export class Session implements ISession {
    private _model: string;
    private _title : string;
    
    public get model() : string {
        return this._model;
    }
    public set model(v : string) {
        this._model = v;
    }

    public get title() : string {
        return this._title;
    }
    public set title(v: string) {
        if (v.trim().length == 0) {
            throw new Error("Title can't be empty");
        }
        this._title = v;
    }

    constructor(title: string, model: string) {
        this.title = title
        this.model = model
    }
}