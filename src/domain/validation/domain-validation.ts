import { EntityValidationExceptions } from '../exceptions/entity-validation-exception';

export class DomainValidation {
    public static notNull(target: object | string, fieldName: string) {
        if (!target) {
            throw new EntityValidationExceptions(
                `${fieldName} should not be null or undefined`
            );
        }
    }

    public static notEmptyOrNull(target: string, fieldName: string) {
        if (!target || !target?.length || !target?.trim().length) {
            throw new EntityValidationExceptions(
                `${fieldName} should not be empty or null`
            );
        }
    }

    public static minLength(
        target: string,
        fieldName: string,
        minLength: number
    ) {
        if (target.length < minLength) {
            throw new EntityValidationExceptions(
                `${fieldName} should be at leats 3 characters long`
            );
        }
    }

    public static maxLength(
        target: string,
        fieldName: string,
        maxLength: number
    ) {
        if (target.length > maxLength) {
            throw new EntityValidationExceptions(
                `${fieldName} should not be greater of ${maxLength.toString().replace('.', '_')} characters long`
            );
        }
    }
}
