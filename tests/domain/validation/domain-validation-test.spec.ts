import { CategoryTestFixture } from '../entity/category/category-test-fixture';
import { DomainValidation } from './../../../src/domain/validation/domain-validation';
import { faker } from '@faker-js/faker';

describe('DOMAIN - domainValidationTest', () => {
    test('Should not throw error null', () => {
        const value = faker.commerce.productName();
        const fieldName = 'Name';
        expect(() => DomainValidation.notNull(value, fieldName)).not.toThrow();
    });

    test.each([null, undefined])(
        'Should throw error when null',
        (value: null | undefined) => {
            const fieldName = 'name';
            expect(() => DomainValidation.notNull(value!, fieldName)).toThrow(
                `${fieldName} should not be null or undefined`
            );
        }
    );

    test.each(['', ' ', '   '])(
        'Should throw error when value is empty or null',
        (value: string) => {
            const fieldName = 'name';
            expect(() =>
                DomainValidation.notEmptyOrNull(value!, fieldName)
            ).toThrow(`${fieldName} should not be empty or null`);
        }
    );

    test.each(['a', 'sa', 's', 'ds'])(
        'Should throw error when value not has minium 3 character long',
        (value: string) => {
            const fieldName = 'name';
            const minLength = 3;
            expect(() =>
                DomainValidation.minLength(value, fieldName, minLength)
            ).toThrow(
                `${fieldName} should be at leats ${minLength} characters long`
            );
        }
    );

    test.each([
        'kim',
        faker.commerce.productName(),
        faker.commerce.productName(),
        faker.commerce.productName(),
    ])(
        'Should NOT throw error when value has minium 3 character long',
        (value: string) => {
            const fieldName = 'name';
            expect(() =>
                DomainValidation.minLength(value, fieldName, 3)
            ).not.toThrow();
        }
    );

    test.each([
        CategoryTestFixture.generateText(10_100),
        CategoryTestFixture.generateText(11_100),
    ])(
        'Should throw error when value has more then max character long',
        (value: string) => {
            const fieldName = 'name';
            const maxLength = 10_000;
            expect(() =>
                DomainValidation.maxLength(value, fieldName, maxLength)
            ).toThrow(
                `${fieldName} should not be greater of ${maxLength} characters long`
            );
        }
    );

    test.each([
        CategoryTestFixture.generateText(9_999),
        CategoryTestFixture.generateText(2_312),
        CategoryTestFixture.generateText(4_345),
        CategoryTestFixture.generateText(34),
        CategoryTestFixture.generateText(5_553),
    ])(
        'Should NOt throw error when value has less then max character long',
        (value: string) => {
            const fieldName = 'name';
            const maxLength = 10_000;
            expect(() =>
                DomainValidation.maxLength(value, fieldName, maxLength)
            ).not.toThrow();
        }
    );
});
