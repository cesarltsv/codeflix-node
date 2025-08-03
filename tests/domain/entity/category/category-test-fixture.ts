import { Category } from '../../../../src/domain/entity/Category/Category';
import { BaseFixture } from '../../../common/base-fixture';

export class CategoryTestFixture extends BaseFixture {
    constructor() {
        super();
    }

    public getValidCategory() {
        return new Category(
            this.getValidName(),
            this.getValidDescription(),
            this.getRamondStatus()
        );
    }
}
