import { IUnitOfWork } from '../../../src/application/interfaces/iunit-of-work';
import { CreateCategory } from '../../../src/application/useCases/category/CreateCategory/CreateCategory';
import { EntityValidationExceptions } from '../../../src/domain/exceptions/entity-validation-exception';
import { ICategoryRepository } from '../../../src/domain/repository/icategory-repository';
import { BaseFixture } from '../../common/base-fixture';
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
        expect(output.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.isActive).toBe(input.isActive);
        expect(output.createdAt).not.toBeNull();
    });

    test('Should create a category', async () => {
        let input = fixture.createCategoryInput();
        const cancelationToken = new AbortController();
        input.description = null!;
        const output = await useCase.handle(input, cancelationToken);

        expect(unitOfWorkMock.commit).toHaveBeenCalledWith(cancelationToken);
        expect(repositoryMock.insert).toHaveBeenCalled();
        expect(output.id).not.toBeNull();
        expect(output.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(output.name).toBe(input.name);
        expect(output.description).toBe('');
        expect(output.isActive).toBe(input.isActive);
        expect(output.createdAt).not.toBeNull();
    });

    test.each(['', ' ', '  ', null, undefined])(
        'Should Throw error when cannot Instaciate with invalid name',
        async (value: string | null | undefined) => {
            let input = fixture.createCategoryInput();
            let expectedMessage = 'name should not be empty or null';
            const cancelationToken = new AbortController();
            input.name = value as string;
            try {
                await useCase.handle(input, cancelationToken);
            } catch (err) {
                expect(err).toBeInstanceOf(EntityValidationExceptions);
                expect(err.message).toBe(expectedMessage);
            }
        }
    );

    test.each(['a', 'aa', 'b', 'as'])(
        'Should Throw error when cannot Instaciate with invalid name too short',
        async (value: string) => {
            let input = fixture.createCategoryInput();
            let expectedMessage = 'name should be at leats 3 characters long';
            const cancelationToken = new AbortController();
            input.name = value as string;
            try {
                await useCase.handle(input, cancelationToken);
            } catch (err) {
                expect(err).toBeInstanceOf(EntityValidationExceptions);
                expect(err.message).toBe(expectedMessage);
            }
        }
    );

    test.each([
        BaseFixture.generateText(256),
        BaseFixture.generateText(333),
        BaseFixture.generateText(2332),
    ])(
        'Should Throw error when cannot Instaciate with invalid name too long',
        async (value: string | null | undefined) => {
            let input = fixture.createCategoryInput();
            let expectedMessage =
                'name should not be greater of 255 characters long';
            const cancelationToken = new AbortController();
            input.name = value as string;
            try {
                await useCase.handle(input, cancelationToken);
            } catch (err) {
                expect(err).toBeInstanceOf(EntityValidationExceptions);
                expect(err.message).toBe(expectedMessage);
            }
        }
    );

    test.each(['', ' ', '  ', null, undefined])(
        'Should Throw error when cannot Instaciate with invalid description',
        async (value: string | null | undefined) => {
            let input = fixture.createCategoryInput();
            let expectedMessage = 'description should not be null or undefined';
            const cancelationToken = new AbortController();
            input.description = value as string;
            try {
                await useCase.handle(input, cancelationToken);
            } catch (err) {
                expect(err).toBeInstanceOf(EntityValidationExceptions);
                expect(err.message).toBe(expectedMessage);
            }
        }
    );

    test.each([
        BaseFixture.generateText(10_001),
        BaseFixture.generateText(11_001),
    ])(
        'Should Throw error when cannot Instaciate with description too long',
        async (value: string | null | undefined) => {
            let input = fixture.createCategoryInput();
            let expectedMessage =
                'description should not be greater of 10000 characters long';
            const cancelationToken = new AbortController();
            input.description = value as string;
            try {
                await useCase.handle(input, cancelationToken);
            } catch (err) {
                expect(err).toBeInstanceOf(EntityValidationExceptions);
                expect(err.message).toBe(expectedMessage);
            }
        }
    );
});
