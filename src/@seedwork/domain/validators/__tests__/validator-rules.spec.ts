import { ValidationError } from '../../../errors';
import { ValidatorRules } from '../validators-rules';

describe('Validation rules Unit teste', () => {
  test('should validae metho withValues', () => {
    const value = 'some value';
    const field = 'field';

    const validator = ValidatorRules.withValues(value, field);
    expect(validator).toBeInstanceOf(ValidatorRules);

    expect(validator['values']).toBe(value);
    expect(validator['field']).toBe(field);
  });

  test('should validate required field', () => {
    const valuesToTest = [undefined, null];
    const field = 'field';

    valuesToTest.forEach(value => {
      const validator = ValidatorRules.withValues(value, field);

      expect(() => validator.isRequired()).toThrow(ValidationError);
    });

    const validFieldValues = ['some field', 5, new Date()];

    validFieldValues.forEach(value => {
      const validator = ValidatorRules.withValues(value, field);

      expect(() => validator.isRequired()).not.toThrow(ValidationError);
    });
  });

  test('should validate nullable', () => {
    expect(() =>
      ValidatorRules.withValues(undefined, 'field').string().nullable(),
    ).toThrow(ValidationError);

    [null, 'some value'].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').string().nullable(),
      ).not.toThrowError(ValidationError);
    });
  });

  test('should validate string', () => {
    expect(() => ValidatorRules.withValues(1, 'field').string()).toThrow(
      ValidationError,
    );

    expect(() =>
      ValidatorRules.withValues('', 'field').string(),
    ).not.toThrowError(ValidationError);
  });

  test('should validate number', () => {
    ['', Number.NaN].forEach(item => {
      expect(() => ValidatorRules.withValues(item, 'field').number()).toThrow(
        ValidationError,
      );
    });

    expect(() =>
      ValidatorRules.withValues(1, 'field').number(),
    ).not.toThrowError(ValidationError);
  });

  test('should validate boolean', () => {
    ['false', undefined, null].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').boolean().isRequired(),
      ).toThrow(ValidationError);
    });

    expect(() =>
      ValidatorRules.withValues(true, 'field').boolean(),
    ).not.toThrowError(ValidationError);
  });

  test('should validate date', () => {
    expect(() =>
      ValidatorRules.withValues('invalid date', 'field').date(),
    ).toThrow(ValidationError);

    expect(() =>
      ValidatorRules.withValues(new Date(), 'field').date(),
    ).not.toThrowError(ValidationError);
  });

  test('should validate min value', () => {
    expect(() =>
      ValidatorRules.withValues(5, 'field').number().isRequired().min(10),
    ).toThrow(ValidationError);

    [null, 15].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').number().min(10),
      ).not.toThrow(ValidationError);
    });

    expect(() =>
      ValidatorRules.withValues('aaaaaa', 'field')
        .string()
        .isRequired()
        .min(10),
    ).toThrow(ValidationError);

    expect(() =>
      ValidatorRules.withValues('aaa', 'field').string().isRequired().min(2),
    ).not.toThrow(ValidationError);

    const dateInstance = new Date();
    expect(() =>
      ValidatorRules.withValues(dateInstance, 'field')
        .date()
        .isRequired()
        .min(new Date(dateInstance.getFullYear(), dateInstance.getMonth() + 1)),
    ).toThrow(ValidationError);

    [
      null,
      new Date(
        dateInstance.getFullYear(),
        dateInstance.getMonth() + 1,
        dateInstance.getDate() + 1,
      ),
    ].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').date().min(new Date()),
      ).not.toThrow(ValidationError);
    });
  });

  test('should validate max value', () => {
    expect(() =>
      ValidatorRules.withValues(15, 'field').number().nullable().max(10),
    ).toThrow(ValidationError);

    [null, 5].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').number().max(10),
      ).not.toThrow(ValidationError);
    });

    expect(() =>
      ValidatorRules.withValues('asdfasdfasdf', 'field')
        .string()
        .isRequired()
        .max(10),
    ).toThrow(ValidationError);

    [null, 'teste'].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').string().max(10),
      ).not.toThrow(ValidationError);
    });

    const dateInstance = new Date();

    expect(() =>
      ValidatorRules.withValues(
        new Date(dateInstance.getFullYear(), dateInstance.getMonth() + 1),
        'field',
      )
        .date()
        .nullable()
        .max(dateInstance),
    ).toThrow(ValidationError);

    [null, dateInstance].forEach(item => {
      expect(() =>
        ValidatorRules.withValues(item, 'field').date().max(new Date()),
      ).not.toThrow(ValidationError);
    });
  });

  test('should validate equal value', () => {
    expect(() =>
      ValidatorRules.withValues('a', 'field').string().isRequired().equal(10),
    ).toThrow(ValidationError);

    expect(() =>
      ValidatorRules.withValues('0123456789', 'field')
        .string()
        .isRequired()
        .equal(10),
    ).not.toThrow(ValidationError);
  });
});
