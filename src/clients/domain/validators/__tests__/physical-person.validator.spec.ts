import { PhysicalPersonValidator } from '../physical-person.validator';

describe('Person validator tests', () => {
  let personValidator: PhysicalPersonValidator;

  beforeEach(() => {
    personValidator = new PhysicalPersonValidator();
  });

  it('invalidation cases for genre', async () => {
    expect(await personValidator.validate({ genre: undefined })).toBeFalsy();
    expect(personValidator.errors.genre).toStrictEqual([
      'genre is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ genre: null })).toBeFalsy();
    expect(personValidator.errors.genre).toStrictEqual([
      'genre is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(
      await personValidator.validate({ genre: 'a'.repeat(256) }),
    ).toBeFalsy();
    expect(personValidator.errors.genre).toStrictEqual([
      'genre must be at most 12 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('invalidation cases for cpf', async () => {
    expect(await personValidator.validate({ cpf: undefined })).toBeFalsy();
    expect(personValidator.errors.cpf).toStrictEqual([
      'cpf is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ cpf: null })).toBeFalsy();
    expect(personValidator.errors.cpf).toStrictEqual([
      'cpf is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ cpf: 'a'.repeat(5) })).toBeFalsy();
    expect(personValidator.errors.cpf).toStrictEqual([
      'cpf must be exactly 11 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(
      await personValidator.validate({ cpf: 'a'.repeat(256) }),
    ).toBeFalsy();
    expect(personValidator.errors.cpf).toStrictEqual([
      'cpf must be exactly 11 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('invalidation cases for bornDate', async () => {
    expect(await personValidator.validate({ bornDate: undefined })).toBeFalsy();
    expect(personValidator.errors.bornDate).toStrictEqual([
      'bornDate is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ bornDate: null })).toBeFalsy();
    expect(personValidator.errors.bornDate).toStrictEqual([
      'bornDate is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('validate case for genre', async () => {
    const validName = {
      genre: 'some',
      cpf: '1'.repeat(11),
      bornDate: new Date(),
    };

    expect(await personValidator.validate(validName)).toBeTruthy();
    expect(personValidator.validatedData.genre).toBe(validName.genre);
    expect(personValidator.errors?.['genre']).toBeUndefined();
  });

  it('validate case for cpf', async () => {
    const validName = {
      genre: 'some value',
      cpf: '1'.repeat(11),
      bornDate: new Date(),
    };
    expect(await personValidator.validate(validName)).toBeTruthy();

    expect(personValidator.validatedData.cpf).toBe(validName.cpf);
    expect(personValidator.errors?.['cpf']).toBeUndefined();
  });

  it('validate case for bornDate', async () => {
    const validName = {
      genre: 'some value',
      cpf: '1'.repeat(11),
      bornDate: new Date(),
    };
    expect(await personValidator.validate(validName)).toBeTruthy();

    expect(personValidator.validatedData.bornDate).toBe(validName.bornDate);
    expect(personValidator.errors?.['bornDate']).toBeUndefined();
  });
});
