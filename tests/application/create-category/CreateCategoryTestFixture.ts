import { BaseFixture } from '../../common/base-fixture';
import { CreateCategoryInput } from './../../../src/application/useCases/category/CreateCategory/CreateCategoryInput';

export class CreateCategoryTestFixture extends BaseFixture {
    constructor() {
        super();
    }

    public createCategoryInput(): CreateCategoryInput {
        return new CreateCategoryInput(
            this.getValidName(),
            this.getValidDescription(),
            this.getRamondStatus()
        );
    }
}
