import { EntityValidationError } from '../../../../@seedwork/domain/errors';

import 'reflect-metadata';
import { LegalPerson } from '../legal-person';
import { Person } from '../person';

describe('Legal Person integration tests', () => {
  describe('should validate on create', () => {
    it('should throw an error on invalid person on create', async () => {
      const props = {
        name: 'some name',
        foundationDate: 'some date' as any,
        cnpj: 'auehaueh',
      };
      const spyVlidateGenericPerson = jest.spyOn(Person, 'create');
      expect(() => LegalPerson.create(props)).rejects.toThrow(
        EntityValidationError,
      );
      expect(spyVlidateGenericPerson).toHaveBeenCalledWith(props);
      expect(spyVlidateGenericPerson).toHaveBeenCalledTimes(1);

      expect(() =>
        LegalPerson.create({
          name: 'some name',
          foundationDate: undefined as any,
          cnpj: 'auehaueh',
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        LegalPerson.create({
          name: 'some name',
          foundationDate: null as any,
          cnpj: 'auehaueh',
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        LegalPerson.create({
          name: 'some name',
          foundationDate: new Date(),
          cnpj: 'auehaueh'.repeat(3),
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        LegalPerson.create({
          name: 'some name',
          foundationDate: new Date(),
          cnpj: 'a'.repeat(11),
        }),
      ).rejects.toThrow(EntityValidationError);
    });
  });

  describe('should validate on update', () => {
    it('should throw an error on invalid person on update', async () => {
      const person = await LegalPerson.create({
        name: 'some-person',
        foundationDate: new Date(),
        cnpj: '1'.repeat(16),
      });

      const spyVlidateGenericPerson = jest.spyOn(Person.prototype, 'update');

      expect(async () => {
        await person.update(undefined as any, null as any, null as any);
      }).rejects.toThrow(EntityValidationError);
      expect(spyVlidateGenericPerson).toHaveBeenCalledTimes(1);

      expect(async () => {
        await person.update('new Name', null as any, null as any);
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await person.update('new Name', '1'.repeat(1), null as any);
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await person.update('new Name', '1'.repeat(1), new Date());
      }).rejects.toThrow(EntityValidationError);
    });
  });

  it('should return a valid physical person', async () => {
    const props = {
      name: 'some-person',
      foundationDate: new Date(),
      cnpj: '1'.repeat(16),
    };
    const person = await LegalPerson.create(props);

    expect(person.cnpj).toBe(props.cnpj);
    expect(person.foundationDate).toEqual(props.foundationDate);

    const updatedName = 'updated name';
    const updatedcnpj = '2'.repeat(16);
    const updatedfoundationDate = new Date();

    await person.update(updatedName, updatedcnpj, updatedfoundationDate);

    expect(person.person.name).toBe(updatedName);
    expect(person.cnpj).toBe(updatedcnpj);
    expect(person.foundationDate).toEqual(updatedfoundationDate);
  });
});
