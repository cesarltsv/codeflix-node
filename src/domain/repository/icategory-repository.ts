import type { Category } from '../entity/category/category';
import type { IGenericaRepository } from '../seedWork/generic-repository';

export interface ICategoryRepository extends IGenericaRepository<Category> {}
