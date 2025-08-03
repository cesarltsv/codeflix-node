import type { UUID } from 'node:crypto';

export class CreateCategoryOutPut {
    public id: UUID;
    public name: string;
    public description?: string;
    public isActive: boolean;
    public createdAt: Date;

    constructor(
        id: UUID,
        name: string,
        description: string,
        isActive: boolean,
        createdAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}
