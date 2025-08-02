import { randomUUID, type UUID } from 'crypto';
import { Category } from './../../../../src/domain/entity/category/category';
import { EntityValidationExceptions } from '../../../../src/domain/exceptions/entity-validation-exception';
describe('DOMAIN - Category - aggregates', () => {
    function generateRandomText(length = 256) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

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
        (value: string | undefined | null) => {
            const description = 'This is a description mock';
            try {
                new Category(value as string, description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(value as string, description)).toThrow(
                'Name should not be empty or null'
            );
        }
    );

    test.each([undefined, null])(
        'Should throw error when Instatiated description with %s',
        (value: string | undefined | null) => {
            const name = 'fakeName';
            try {
                new Category(name, value as string);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(name, value as string)).toThrow(
                'Description should not be null or undefined'
            );
        }
    );

    test.each(['a', 'as'])(
        'Should throw error when name has lass then 3 character s',
        (value: string) => {
            const description = 'fakeName';
            try {
                new Category(value, description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(value, description)).toThrow(
                'Name should be at leats 3 characters long'
            );
        }
    );

    test.each([generateRandomText(321), generateRandomText(256)])(
        'Should throw error when name has more then 255 character',
        (value: string) => {
            const description = 'fakeName';
            try {
                new Category(value, description);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(value, description)).toThrow(
                'Name should not be greater of 255 characters long'
            );
        }
    );

    test.each([generateRandomText(10_001), generateRandomText(10_003)])(
        'Should throw error when description has more then 10_000 character',
        (value: string) => {
            const name = 'fakeName';
            try {
                new Category(value, value);
            } catch (error) {
                expect(error).toBeInstanceOf(EntityValidationExceptions);
            }
            expect(() => new Category(name, value)).toThrow(
                'Description should not be greater of 10.000 characters long'
            );
        }
    );

    test('Should Active Category', () => {
        const validData = {
            name: 'Category Name',
            description: 'This is a description mock',
        };

        var category = new Category(
            validData.name,
            validData.description,
            false
        );

        category.activate();

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

    test('Should Deactive Category', () => {
        const validData = {
            name: 'Category Name',
            description: 'This is a description mock',
        };

        var category = new Category(
            validData.name,
            validData.description,
            true
        );

        category.deactivate();

        expect(category).not.toBeNull();
        expect(category.id).not.toBeUndefined();
        expect(category.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
        expect(category.name).toBe(validData.name);
        expect(category.description).toBe(validData.description);
        expect(category.isActive).toBe(false);
        expect(category.createdAt).toBeInstanceOf(Date);
    });
});
