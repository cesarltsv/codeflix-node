import { EntityValidationExceptions } from '../../../../src/domain/exceptions/entity-validation-exception';
import { Category } from './../../../../src/domain/entity/category/category';
import { CategoryTestFixture } from './category-test-fixture';
describe('DOMAIN - Category - aggregates', () => {
    let fixture!: CategoryTestFixture;
    const MAX_DESCRIPTION_LENGTH = 10_000;
    beforeAll(() => {
        fixture = new CategoryTestFixture();
    });

    test('Should Instantiate Category', () => {
        const validCategory = fixture.getValidCategory();
        var category = new Category(
            validCategory.name,
            validCategory.description
        );

        expect(category).not.toBeNull();
        expect(category.id).not.toBeUndefined();
        expect(category.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(category.name).toBe(validCategory.name);
        expect(category.description).toBe(validCategory.description);
        expect(category.isActive).toBe(validCategory.isActive);
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test.each([true, false])(
        'Should Instantiate Category with IsActive %s',
        (isActive: boolean) => {
            const validCategory = fixture.getValidCategory();
            var category = new Category(
                validCategory.name,
                validCategory.description,
                isActive
            );
            expect(category).not.toBeNull();
            expect(category.id).not.toBeUndefined();
            expect(category.id).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            );
            expect(category.name).toBe(validCategory.name);
            expect(category.description).toBe(validCategory.description);
            expect(category.isActive).toBe(isActive);
            expect(category.createdAt).toBeInstanceOf(Date);
        }
    );

    test.each(['', ' ', '    ', undefined, null])(
        'Should throw error when Instatiated with name empty',
        (value: string | undefined | null) => {
            const validCategory = fixture.getValidCategory();
            try {
                new Category(value as string, validCategory.description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(
                () => new Category(value as string, validCategory.description)
            ).toThrow('name should not be empty or null');
        }
    );

    test.each([undefined, null])(
        'Should throw error when Instatiated description with %s',
        (value: string | undefined | null) => {
            const validCategory = fixture.getValidCategory();
            try {
                new Category(validCategory.name, value as string);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(
                () => new Category(validCategory.name, value as string)
            ).toThrow('description should not be null or undefined');
        }
    );

    test.each([
        CategoryTestFixture.generateNameLassThan3Characters(),
        CategoryTestFixture.generateNameLassThan3Characters(),
    ])(
        'Should throw error when name has lass then 3 character s',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            try {
                new Category(value, validCategory.description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(
                () => new Category(value, validCategory.description)
            ).toThrow('name should be at leats 3 characters long');
        }
    );

    test.each([
        CategoryTestFixture.generateText(321),
        CategoryTestFixture.generateText(256),
    ])(
        'Should throw error when name has more then 255 character',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            try {
                new Category(value, validCategory.description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(
                () => new Category(value, validCategory.description)
            ).toThrow('name should not be greater of 255 characters long');
        }
    );

    test.each([
        CategoryTestFixture.generateText(10_001),
        CategoryTestFixture.generateText(10_003),
    ])(
        'Should throw error when description has more then 10_000 character',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            try {
                new Category(validCategory.name, value);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(validCategory.name, value)).toThrow(
                `description should not be greater of ${MAX_DESCRIPTION_LENGTH} characters long`
            );
        }
    );

    test('Should Active Category', () => {
        const validCategory = fixture.getValidCategory();
        var category = new Category(
            validCategory.name,
            validCategory.description,
            false
        );

        category.activate();

        expect(category).not.toBeNull();
        expect(category.id).not.toBeUndefined();
        expect(category.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(category.name).toBe(validCategory.name);
        expect(category.description).toBe(validCategory.description);
        expect(category.isActive).toBe(true);
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('Should Deactive Category', () => {
        const validCategory = fixture.getValidCategory();
        var category = new Category(
            validCategory.name,
            validCategory.description,
            true
        );

        category.deactivate();

        expect(category).not.toBeNull();
        expect(category.id).not.toBeUndefined();
        expect(category.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(category.name).toBe(validCategory.name);
        expect(category.description).toBe(validCategory.description);
        expect(category.isActive).toBe(false);
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('Should update category description and name', () => {
        const validCategory = fixture.getValidCategory();
        const category = new Category(
            validCategory.name,
            validCategory.description
        );
        const newCategory = fixture.getValidCategory();

        category.update(newCategory.name, newCategory.description);
        expect(category.name).toBe(newCategory.name);
        expect(category.description).toBe(newCategory.description);
    });

    test('Should name update category', () => {
        const validCategory = fixture.getValidCategory();
        const category = new Category(
            validCategory.name,
            validCategory.description
        );
        const currentDescription = category.description;
        const newCategory = fixture.getValidCategory();

        category.update(newCategory.name);
        expect(category.name).toBe(newCategory.name);
        expect(category.description).toBe(currentDescription);
    });

    test.each(['', ' ', '    '])(
        'Should throw error when Update with name empty',
        (value: string) => {
            const expectedError = new EntityValidationExceptions(
                'name should not be empty or null'
            );
            const validCategory = fixture.getValidCategory();
            const category = new Category(
                validCategory.name,
                validCategory.description
            );
            try {
                category.update(value);
            } catch (err) {
                expect(err).toEqual(expectedError);
            }
        }
    );

    test.each([undefined, null])(
        'Should throw error when update description with %s',
        (value: string | undefined | null) => {
            const validCategory = fixture.getValidCategory();
            const expectedError = new EntityValidationExceptions(
                'description should not be null or undefined'
            );
            new Category(validCategory.name, validCategory.description);
            try {
                new Category(validCategory.name, value as string);
            } catch (err) {
                expect(err).toEqual(expectedError);
            }
        }
    );

    test.each(['a', 'as'])(
        'Should throw error update name has lass then 3 character s',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            const expectedError = new EntityValidationExceptions(
                'name should be at leats 3 characters long'
            );
            const category = new Category(
                validCategory.name,
                validCategory.description
            );
            try {
                category.update(value);
            } catch (err) {
                expect(err).toEqual(expectedError);
            }
        }
    );

    test.each([
        CategoryTestFixture.generateText(321),
        CategoryTestFixture.generateText(256),
    ])(
        'Should throw error when name has more then 255 character',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            const expectedError = new EntityValidationExceptions(
                'name should not be greater of 255 characters long'
            );
            try {
                new Category(value, validCategory.description);
            } catch (err) {
                expect(err).toEqual(expectedError);
            }
        }
    );

    test.each([
        CategoryTestFixture.generateText(10_001),
        CategoryTestFixture.generateText(10_003),
    ])(
        'Should throw error when description has more then 10_000 character',
        (value: string) => {
            const validCategory = fixture.getValidCategory();
            const expectedError = new EntityValidationExceptions(
                `description should not be greater of ${MAX_DESCRIPTION_LENGTH} characters long`
            );
            try {
                new Category(validCategory.name, value);
            } catch (err) {
                expect(err).toEqual(expectedError);
            }
        }
    );
});
