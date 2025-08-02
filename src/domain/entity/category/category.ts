import { randomUUID, type UUID } from 'crypto';

export class Category {
    private _id: UUID;
    private _name: string;
    private _description: string;
    private _isActive: boolean;
    private _createdAt: Date;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
        this._isActive = true;
        this._createdAt = new Date();
        this._id = randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get createdAt(): Date {
        return this._createdAt;
    }
}
