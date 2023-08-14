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

      error.inner.forEach(err => {
        if (!this.errors[err.path as string])
          this.errors[err.path as string] = [];
        this.errors[err.path as string].push(...err.errors);
      });

      return false;
    }
  }
}
