import { IValidatorFields } from '@seedwork/domain/validators/ivalidator';
import { IPersonProps } from '../entities/person';
import { IPersonProps as PhysicalPersonProps } from '../entities/physical-person';
import { PersonValidator } from './person.validator';
import { PhysicalPersonValidator } from './physical-person.validator';

export class PersonValidatorFactory {
  static create(): IValidatorFields<IPersonProps> {
    return new PersonValidator();
  }
}

export class PhysicalPersonValidatorFactory {
  static create(): IValidatorFields<PhysicalPersonProps> {
    return new PhysicalPersonValidator();
  }
}
