import { faker } from '@faker-js/faker';

export class BaseFixture {
    public getValidName() {
        return faker.commerce.productName().slice(0, 255);
    }

    public getValidDescription() {
        return faker.commerce.productDescription().slice(0, 10_000);
    }

    public getRamondStatus() {
        const randomNumber = Math.floor((Math.random() * 100) % 2);
        if (randomNumber != 0) return true;
        return false;
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
