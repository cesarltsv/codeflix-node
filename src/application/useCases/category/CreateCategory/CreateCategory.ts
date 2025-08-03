import { Category } from '../../../../domain/entity/Category/Category';
import type { ICategoryRepository } from '../../../../domain/repository/icategory-repository';
import type { IUnitOfWork } from '../../../interfaces/iunit-of-work';
import type { CreateCategoryInput } from './CreateCategoryInput';
import { CreateCategoryOutPut } from './CreateCategoryOutput';
import type { ICreateCategory } from './ICreateCategory.interface';

export class CreateCategory implements ICreateCategory {
    private readonly _IUnitOfWork: IUnitOfWork;
    private readonly _ICategoryRepository: ICategoryRepository;

    constructor(
        categoryRepository: ICategoryRepository,
        unitOfwork: IUnitOfWork
    ) {
        this._IUnitOfWork = unitOfwork;
        this._ICategoryRepository = categoryRepository;
    }

    async handle(
        input: CreateCategoryInput,
        cancelationToken: AbortController
    ): Promise<CreateCategoryOutPut> {
        var category = new Category(
            input.name,
            input.description!,
            input.isActive
        );
        await this._ICategoryRepository.insert(category, cancelationToken);
        await this._IUnitOfWork.commit(cancelationToken);
        return new CreateCategoryOutPut(
            category.id,
            category.name,
            category.description,
            category.isActive,
            category.createdAt
        );
    }
}
