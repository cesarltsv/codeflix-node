import type { IRequestHandler } from '../../../../common/IRequestHandler';
import { CreateCategoryInput } from './CreateCategoryInput';
import { CreateCategoryOutPut } from './CreateCategoryOutput';

export interface ICreateCategory
    extends IRequestHandler<CreateCategoryInput, CreateCategoryOutPut> {
    handle(
        input: CreateCategoryInput,
        cancelationToken: AbortController
    ): Promise<CreateCategoryOutPut>;
}
