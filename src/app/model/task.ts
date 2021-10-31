
export class Task {
    public _projectId: number;
    private _id: number;
    private _title: string;
    private _description: string;
    private _priority: number;
    private _entryDate: string;
    private _deadlineDate: string;
    private _rememberMe: number;
    private _completed: boolean;

    public get id(): number
    {
        return this._id;
    }

    public set id(id: number)
    {
        this._id = id;
    }

    public get projectId(): number
    {
        return this._projectId;
    }

    public set projectId(projectId: number)
    {
        this._projectId = projectId;
    }

    public get title(): string {
        return this._title;
    }

    public getTitle(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get priority(): number {
        return this._priority;
    }

    public set priority(priority: number) {
        this._priority = priority;
    }

    public get entryDate(): string {
        return this._entryDate;
    }

    public set entryDate(entryDate: string) {
        this._entryDate = entryDate;
    }

    public get deadlineDate(): string {
        return this._deadlineDate;
    }

    public set deadlineDate(deadlineDate: string) {
        this._deadlineDate = deadlineDate;
    }

    public get rememberMe(): number {
        return this._rememberMe;
    }

    public set rememberMe(rememberMe: number) {
        this._rememberMe = rememberMe;
    }

    public get completed(): boolean
    {
        return this._completed;
    }

    public set completed(completed: boolean)
    {
        this._completed = completed;
    }

}
