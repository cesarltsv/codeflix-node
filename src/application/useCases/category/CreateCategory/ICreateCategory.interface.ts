import { CreateCategoryInput } from './CreateCategoryInput';
import { CreateCategoryOutPut } from './CreateCategoryOutput';

export interface ICreateCategory {
    handle(
        input: CreateCategoryInput,
        cancelationToken: AbortController
    ): Promise<CreateCategoryOutPut>;
}
