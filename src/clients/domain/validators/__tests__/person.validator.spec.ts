import { PersonValidator } from '../person.validator';

describe('Person validator tests', () => {
  let personValidator: PersonValidator;

  beforeEach(() => {
    personValidator = new PersonValidator();
  });

  it('invalidation cases for name', async () => {
    expect(await personValidator.validate({ name: null })).toBeFalsy();
    expect(personValidator.errors.name).toStrictEqual([
      'name is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(await personValidator.validate({ name: '' })).toBeFalsy();
    expect(personValidator.errors.name).toStrictEqual([
      'name is a required field',
    ]);
    expect(personValidator.validatedData).toBeUndefined();

    expect(
      await personValidator.validate({ name: 'a'.repeat(256) }),
    ).toBeFalsy();
    expect(personValidator.errors.name).toStrictEqual([
      'name must be at most 255 characters',
    ]);
    expect(personValidator.validatedData).toBeUndefined();
  });

  it('validate case for name', async () => {
    const validName = { name: 'some value' };
    expect(await personValidator.validate(validName)).toBeTruthy();

    expect(personValidator.validatedData.name).toBe(validName.name);
    expect(personValidator.errors?.['name']).toBeUndefined();
  });
});
