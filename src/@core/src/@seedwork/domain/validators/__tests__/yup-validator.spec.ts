import { YupValidator } from '../yup-validator';
import * as yup from 'yup';

class StubYupValidator extends YupValidator<{ field: string }> {
  constructor() {
    super(yup.object());
  }
}

describe('YupValidator fields tests', () => {
  it('should initialize errors and validatedData with undefined', () => {
    const validator = new StubYupValidator();
    expect(validator.errors).toBeUndefined();
    expect(validator.validatedData).toBeUndefined();
  });

  it('should validate with errors', async () => {
    const spyValidate = jest.spyOn(yup.object.prototype, 'validate');

    spyValidate.mockImplementation(function () {
      throw new yup.ValidationError(
        {
          name: 'ValidationError',
          message: 'error',
          path: 'field',
          errors: ['error'],
          inner: [new yup.ValidationError('error', true, 'field')],
          type: 'some type',
          value: { start: '2017-11-10' },
        },
        '',
        'field',
      );
    });

    const validator = new StubYupValidator();
    expect(await validator.validate(null)).toBeFalsy();
    expect(spyValidate).toHaveBeenCalled();
    expect(validator.validatedData).toBeUndefined();
    expect(validator.errors).toStrictEqual({
      field: ['error'],
    });
  });

  it('should validate without errors', async () => {
    const spyValidate = jest.spyOn(yup.object.prototype, 'validate');

    spyValidate.mockImplementation(function () {
      return {};
    });

    const validator = new StubYupValidator();
    expect(await validator.validate({ field: 'some value' })).toBeTruthy();
    expect(spyValidate).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: 'some value' });
    expect(validator.errors).toBeUndefined();
  });
});
