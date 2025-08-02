import { randomUUID, type UUID } from 'crypto';
import { EntityValidationExceptions } from '../../exceptions/entity-validation-exception';

export class Category {
    private _id: UUID;
    private _name: string;
    private _description: string;
    private _isActive: boolean;
    private _createdAt: Date;

    constructor(name: string, description: string, isActive: boolean = true) {
        this._name = name;
        this._description = description;
        this._isActive = isActive;
        this._createdAt = new Date();
        this._id = randomUUID();
        this.validate();
    }

    public validate(): void {
        if (!this._name || !this._name.length || !this._name.trim().length) {
            throw new EntityValidationExceptions(
                'Name should not be empty or null'
            );
        }

        if (this._name.length < 3) {
            throw new EntityValidationExceptions(
                'Name should be at leats 3 characters long'
            );
        }

        if (this._name.length > 255) {
            throw new EntityValidationExceptions(
                'Name should not be greater of 255 characters long'
            );
        }

        if (this._description == null || this._description == undefined) {
            throw new EntityValidationExceptions(
                'Description should not be null or undefined'
            );
        }

        if (this._description.length > 10_000) {
            throw new EntityValidationExceptions(
                'Description should not be greater of 10.000 characters long'
            );
        }
    }

    public activate() {
        this._isActive = true;
        this.validate();
    }

    public deactivate() {
        this._isActive = false;
        this.validate();
    }

    public update(name: string, description: string = '') {
        if (name?.length) this._name = name;
        if (description?.length) this._description = description;
        this.validate();
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
