import { randomUUID, type UUID } from 'crypto';
import { Category } from './../../../../src/domain/entity/category/category';
describe('DOMAIN - Category - aggregates', () => {
    test('Should Instantiate Category', () => {
        const validData = {
            name: 'Category Name',
            description: 'This is a description mock',
        };

        var category = new Category(validData.name, validData.description);
        expect(category).not.toBeNull();
        expect(category.id).not.toBeUndefined();
        expect(category.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(category.name).toBe(validData.name);
        expect(category.description).toBe(validData.description);
        expect(category.isActive).toBe(true);
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test.each([true, false])(
        'Should Instantiate Category with IsActive %s',
        (isActive: boolean) => {
            const validData = {
                name: 'Category Name',
                description: 'This is a description mock',
            };

            var category = new Category(
                validData.name,
                validData.description,
                isActive
            );
            expect(category).not.toBeNull();
            expect(category.id).not.toBeUndefined();
            expect(category.id).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            );
            expect(category.name).toBe(validData.name);
            expect(category.description).toBe(validData.description);
            expect(category.isActive).toBe(isActive);
            expect(category.createdAt).toBeInstanceOf(Date);
        }
    );

    test.each(['', ' ', '    ', undefined, null])(
        'Should throw error when Instatiated with name empty',
        (name: string | undefined | null) => {
            const description = 'This is a description mock';

            expect(() => new Category(name as string, description)).toThrow(
                'Name should not be empty or null'
            );
        }
    );

    test.each([undefined, null])(
        'Should throw error when Instatiated description with %s',
        (description: string | undefined | null) => {
            const name = 'fakeName';

            expect(() => new Category(name, description as string)).toThrow(
                'Description should not be null or undefined'
            );
        }
    );
});
