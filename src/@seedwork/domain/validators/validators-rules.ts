import { ValidationError } from '../../domain/errors';

export class ValidatorRules<T extends string | number | Date | boolean> {
  protected constructor(protected values: T, protected field: string) {}

  static withValues(values: any, property: string) {
    return new ValidatorRules(values, property);
  }

  boolean(): Omit<this, 'boolean' | 'string' | 'number' | 'date'> {
    if (!this.isEmpty() && typeof this.values !== 'boolean')
      throw new ValidationError(`The field ${this.field} must be a boolean`);
    return this;
  }

  string(): Omit<this, 'boolean' | 'string' | 'number' | 'date'> {
    if (!this.isEmpty() && typeof this.values !== 'string')
      throw new ValidationError(`The field ${this.field} must be a string`);
    return this;
  }

  number(): Omit<this, 'boolean' | 'string' | 'number' | 'date'> {
    const defaultErrorMessage = `The field ${this.field} must be a number`;

    if (
      !this.isEmpty() &&
      (typeof this.values !== 'number' || Number.isNaN(this.values))
    )
      throw new ValidationError(defaultErrorMessage);

    return this;
  }

  date(): Omit<this, 'boolean' | 'string' | 'number' | 'date'> {
    const defaultErrorMessage = `The field ${this.field} must be a date`;

    if (
      !this.isEmpty() &&
      (!(this.values instanceof Date) ||
        Number.isNaN((this.values as Date).getTime()))
    )
      throw new ValidationError(defaultErrorMessage);

    return this;
  }

  isRequired(): Omit<
    this,
    'boolean' | 'string' | 'number' | 'date' | 'nullable' | 'isRequired'
  > {
    if (this.values === undefined || this.values === null)
      throw new ValidationError(`The field ${this.field} is required`);

    if (typeof this.values === 'string' && this.values.trim().length < 1)
      throw new ValidationError(`The field ${this.field} is required`);

    return this;
  }

  protected isEmpty() {
    return this.values === undefined || this.values === null;
  }

  nullable(): Omit<
    this,
    'boolean' | 'string' | 'number' | 'date' | 'isRequired' | 'nullable'
  > {
    const defaultErrorMessage = `The field ${this.field} must null or a valid value`;

    if (this.values === undefined)
      throw new ValidationError(defaultErrorMessage);

    return this;
  }

  min(
    length: number | Date,
  ): Omit<this, 'string' | 'number' | 'boolean' | 'date'> {
    if (this.values)
      switch (typeof this.values) {
        case 'number':
          if (this.values < length)
            throw new ValidationError(
              `The field ${this.field} is no less than ${length}`,
            );
          break;

        case 'string':
          if (this.values.length < length)
            throw new ValidationError(
              `The field ${this.field} requires a min length of ${length} characters`,
            );
          break;

        default:
          if (
            this.values instanceof Date &&
            this.values.getTime() < (length as Date).getTime()
          )
            throw new ValidationError(
              `The field ${this.field} is no less than ${(
                length as Date
              ).toISOString()}`,
            );

          break;
      }

    return this;
  }

  max(
    length: number | Date,
  ): Omit<this, 'string' | 'number' | 'boolean' | 'date'> {
    if (this.values)
      switch (typeof this.values) {
        case 'number':
          if (this.values > length)
            throw new ValidationError(
              `The field ${this.field} is no more than of ${length}`,
            );
          break;

        case 'string':
          if (this.values.length > length)
            throw new ValidationError(
              `The field ${this.field} requires a max length of ${length} characters`,
            );
          break;

        default:
          if (
            this.values instanceof Date &&
            this.values.getTime() > (length as Date).getTime()
          )
            throw new ValidationError(
              `The field ${this.field} is no more than ${(
                length as Date
              ).toISOString()}`,
            );

          break;
      }

    return this;
  }

  equal(
    length: number | Date,
  ): Omit<this, 'string' | 'number' | 'boolean' | 'date'> {
    if (typeof this.values === 'string' && this.values.length !== length)
      throw new ValidationError(
        `The field ${this.field} requires a length of ${length} character(s)`,
      );

    return this;
  }
}
