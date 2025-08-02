import { randomUUID, type UUID } from 'node:crypto';

export class Entity {
    protected _id: UUID;

    constructor() {
        this._id = randomUUID();
    }

    get id(): UUID {
        return this.id;
    }
}
