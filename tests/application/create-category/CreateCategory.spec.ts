import { IUnitOfWork } from './../../../src/application/interfaces/iunit-of-work';
import { CreateCategory } from './../../../src/application/useCases/category/CreateCategory/CreateCategory';
import { ICategoryRepository } from './../../../src/domain/repository/icategory-repository';
import { CreateCategoryTestFixture } from './CreateCategoryTestFixture';
describe('APPLICATION - create category - use cases', () => {
    let fixture!: CreateCategoryTestFixture;
    let useCase!: CreateCategory;
    const repositoryMock: ICategoryRepository = {
        insert: jest.fn(),
    };
    const unitOfWorkMock: IUnitOfWork = {
        commit: jest.fn(),
    };

    beforeEach(() => {
        fixture = new CreateCategoryTestFixture();
        useCase = new CreateCategory(repositoryMock, unitOfWorkMock);
    });

    test('Should create a category', async () => {
        let input = fixture.createCategoryInput();
        const cancelationToken = new AbortController();

        const output = await useCase.handle(input, cancelationToken);

        expect(unitOfWorkMock.commit).toHaveBeenCalledWith(cancelationToken);
        expect(repositoryMock.insert).toHaveBeenCalled();
        expect(output.id).not.toBeNull();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.isActive).toBe(input.isActive);
        expect(output.createdAt).not.toBeNull();
    });
});
