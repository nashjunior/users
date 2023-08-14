import { IPersonProps } from '../entities/physical-person';
import * as yup from 'yup';
import { YupValidator } from '@seedwork/domain/validators';

export const PersonSchema = yup
  .object()
  .shape({
    genre: yup.string().required().max(12),
    cpf: yup.string().required().length(11),
    bornDate: yup.date().required(),
  })
  .noUnknown()
  .required();

export class PhysicalPersonValidator extends YupValidator<IPersonProps> {
  constructor() {
    super(PersonSchema);
  }

  async validate(data: unknown): Promise<boolean> {
    return super.validate(data);
  }
}
