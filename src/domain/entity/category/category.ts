import { randomUUID, type UUID } from 'crypto';
import { EntityValidationExceptions } from '../../exceptions/entity-validation-exception';
import { AggragateRoot } from '../../seedWork/aggregate-root';
import { DomainValidation } from '../../validation/domain-validation';

export class Category extends AggragateRoot {
    private _name: string;
    private _description: string;
    private _isActive: boolean;
    private _createdAt: Date;

    constructor(name: string, description: string, isActive: boolean = true) {
        super();
        this._name = name;
        this._description = description;
        this._isActive = isActive;
        this._createdAt = new Date();
        this.validate();
    }

    public validate(): void {
        DomainValidation.notEmptyOrNull(this._name, 'name');
        DomainValidation.minLength(this._name, 'name', 3);
        DomainValidation.maxLength(this.name, 'name', 255);
        DomainValidation.notNull(this._description, 'description');
        DomainValidation.maxLength(this._description, 'description', 10_000);
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

    get id(): UUID {
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
