import { CreateCategoryInput } from '../../../src/application/useCases/category/CreateCategory/CreateCategoryInput';
import { IUnitOfWork } from './../../../src/application/interfaces/iunit-of-work';
import { CreateCategory } from './../../../src/application/useCases/category/CreateCategory/CreateCategory';
import { ICategoryRepository } from './../../../src/domain/repository/icategory-repository';
describe('APPLICATION - create category - use cases', () => {
    const repositoryMock: ICategoryRepository = {
        insert: jest.fn(),
    };
    const unitOfWorkMock: IUnitOfWork = {
        commit: jest.fn(),
    };

    let useCase!: CreateCategory;

    beforeEach(() => {
        useCase = new CreateCategory(repositoryMock, unitOfWorkMock);
    });

    test('Should create a category', async () => {
        let input = new CreateCategoryInput(
            'category Name',
            'description',
            true
        );
        const cancelationToken = new AbortController();
        const output = await useCase.handle(input, cancelationToken);
        expect(unitOfWorkMock.commit).toHaveBeenCalledWith(cancelationToken);
        expect(repositoryMock.insert).toHaveBeenCalled();
        expect(output.id).not.toBeNull();
        expect(output.name).toBe('category Name');
        expect(output.description).toBe('description');
        expect(output.isActive).toBe(true);
        expect(output.createdAt).not.toBeNull();
    });
});
