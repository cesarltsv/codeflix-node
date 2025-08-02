import { Category } from '../../../../src/domain/entity/category/category';

export class CategoryTestFixture {
    public getValidCategory(name?: string, description?: string) {
        return new Category('category name', 'category description');
    }

    public generateText(length = 256) {
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
