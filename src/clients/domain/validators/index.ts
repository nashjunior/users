import { IValidatorFields } from '@seedwork/domain/validators/ivalidator';
import { IPersonProps } from '../entities/person';
import { PersonValidator } from './person.validator';

export class PersonValidatorFactory {
  static create(): IValidatorFields<IPersonProps> {
    return new PersonValidator();
  }
}
