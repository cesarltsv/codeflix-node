import { faker } from '@faker-js/faker';
import { Category } from '../../../../src/domain/entity/category/category';

export class CategoryTestFixture {
    public getValidCategory() {
        return new Category(
            faker.commerce.productName().slice(0, 255),
            faker.commerce.productDescription().slice(0, 10_000)
        );
    }

    public static generateNameLassThan3Characters() {
        return faker.commerce.productName().slice(0, 2);
    }

    public static generateText(length = 256) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
}
