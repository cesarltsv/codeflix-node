import type { IRequest } from '../../../../common/IRequest';
import type { CreateCategoryOutPut } from './CreateCategoryOutput';

export class CreateCategoryInput implements IRequest<CreateCategoryOutPut> {
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
