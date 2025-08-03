export class CreateCategoryInput {
    public name: string;
    public description?: string;
    public isActive: boolean;

    constructor(
        name: string,
        description: string = '',
        isActive: boolean = true
    ) {
        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }
}
