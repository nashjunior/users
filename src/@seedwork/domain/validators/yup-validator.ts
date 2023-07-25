import * as yup from 'yup';
import { IErrorField, IValidatorFields } from './ivalidator';

export abstract class YupValidator<T> implements IValidatorFields<T> {
  protected schema: yup.AnySchema;
  errors: IErrorField;
  validatedData: T;

  constructor(schema: yup.AnySchema) {
    this.schema = schema;
  }

  async validate(data: any): Promise<boolean> {
    try {
      await this.schema.validate(data, { abortEarly: false });

      this.validatedData = data;
      return true;
    } catch (error) {
      if (!(error instanceof yup.ValidationError)) throw error;
      this.errors = {};

      if (error.inner.length) {
        for (const fieldError of error.inner) {
          const field = fieldError.path;
          this.errors[field as string] = fieldError.errors;
        }
      }

      console.log(this.errors);

      return false;
    }
  }
}
