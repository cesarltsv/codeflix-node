import type { IRepository } from './irepositiory';

export interface IGenericaRepository<TAggragate> extends IRepository {
    insert(
        category: TAggragate,
        cacellationToken: AbortController
    ): Promise<any>;
}
