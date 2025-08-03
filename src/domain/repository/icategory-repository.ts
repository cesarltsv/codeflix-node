import type { Category } from '../entity/Category/Category';
import type { IGenericaRepository } from '../seedWork/generic-repository';

export interface ICategoryRepository extends IGenericaRepository<Category> {}
