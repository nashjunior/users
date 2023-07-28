import { LegalPersonValidator } from '../legal-person.validator';

describe('Legal Person validator tests', () => {
  let personValidator: LegalPersonValidator;

  beforeEach(() => {
    personValidator = new LegalPersonValidator();
  });

  it('invalidation cases for cnpj', async () => {
    expect(await personValidator.validate({ cnpj: undefined })).toBeFalsy();
    expect(personValidator.errors.cnpj).toStrictEqual([
      'cnpj is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ cnpj: null })).toBeFalsy();
    expect(personValidator.errors.cnpj).toStrictEqual([
      'cnpj is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ cnpj: 'a'.repeat(5) })).toBeFalsy();
    expect(personValidator.errors.cnpj).toStrictEqual([
      'cnpj must be exactly 16 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(
      await personValidator.validate({ cnpj: 'a'.repeat(256) }),
    ).toBeFalsy();
    expect(personValidator.errors.cnpj).toStrictEqual([
      'cnpj must be exactly 16 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('invalidation cases for foundationDate', async () => {
    expect(
      await personValidator.validate({ foundationDate: undefined }),
    ).toBeFalsy();
    expect(personValidator.errors.foundationDate).toStrictEqual([
      'foundationDate is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(
      await personValidator.validate({ foundationDate: null }),
    ).toBeFalsy();
    expect(personValidator.errors.foundationDate).toStrictEqual([
      'foundationDate is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('validate case for cnpj', async () => {
    const validName = { cnpj: '1'.repeat(16), foundationDate: new Date() };

    expect(await personValidator.validate(validName)).toBeTruthy();
    expect(personValidator.validatedData.cnpj).toBe(validName.cnpj);
    expect(personValidator.errors?.['cnpj']).toBeUndefined();
  });

  it('validate case for foundationDate', async () => {
    const validName = { cnpj: '1'.repeat(16), foundationDate: new Date() };
    expect(await personValidator.validate(validName)).toBeTruthy();

    expect(personValidator.validatedData.foundationDate).toBe(
      validName.foundationDate,
    );
    expect(personValidator.errors?.['foundationDate']).toBeUndefined();
  });
});
