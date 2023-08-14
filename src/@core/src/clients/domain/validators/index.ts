import { IValidatorFields } from '../../../@seedwork/domain/validators/ivalidator';
import { IPersonProps } from '../entities/person';
import { PersonValidator } from './person.validator';
import { IPersonProps as PhysicalPersonProps } from '../entities/physical-person';
import { PhysicalPersonValidator } from './physical-person.validator';
import { IPersonProps as LegalPersonProps } from '../entities/legal-person';
import { LegalPersonValidator } from './legal-person.validator';

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

export class LegalPersonValidatorFactory {
  static create(): IValidatorFields<LegalPersonProps> {
    return new LegalPersonValidator();
  }
}
