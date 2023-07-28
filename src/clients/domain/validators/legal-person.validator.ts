import { YupValidator } from '../../../@seedwork/domain/validators/yup-validator';
import { IPersonProps } from '../entities/legal-person';
import * as yup from 'yup';

export const PersonSchema = yup
  .object()
  .shape({
    cnpj: yup.string().required().length(16),
    foundationDate: yup.string().required(),
  })
  .noUnknown()
  .required();

export class LegalPersonValidator extends YupValidator<IPersonProps> {
  constructor() {
    super(PersonSchema);
  }

  async validate(data: unknown): Promise<boolean> {
    return super.validate(data);
  }
}
