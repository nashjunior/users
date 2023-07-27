import { YupValidator } from '../../../@seedwork/domain/validators/yup-validator';
import { IPersonProps } from '../entities/person';
import * as yup from 'yup';

export const PersonSchema = yup
  .object()
  .shape({
    name: yup.string().required().max(255),
  })
  .required();

export class PersonValidator extends YupValidator<IPersonProps> {
  constructor() {
    super(PersonSchema);
  }

  async validate(data: unknown): Promise<boolean> {
    return super.validate(data);
  }
}
