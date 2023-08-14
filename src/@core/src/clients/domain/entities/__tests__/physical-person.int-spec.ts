import { EntityValidationError } from '../../../../@seedwork/domain/errors';

import 'reflect-metadata';
import { PhysicalPerson } from '../physical-person';
import { Person } from '../person';

// describe('Person integration tests', () => {
//   describe('should validate on create', () => {
//     it('should throw an error on invalid person on create', () => {
//       expect(() => new Person({ name: undefined as any })).toThrow(
//         EntityValidationError,
//       );

//       expect(() => new Person({ name: null as any })).toThrow(EntityValidationError);
//       expect(() => new Person({ name: '' })).toThrow(EntityValidationError);
//       expect(() => new Person({ name: 'some name' })).not.toThrow(
//         EntityValidationError,
//       );
//     });
//   });

//   describe('should validate on update', () => {
//     it('should throw an error on invalid person on create', () => {
//       const person = new Person({ name: 'some-person' });

//       expect(() => person.update(undefined as any)).toThrow(EntityValidationError);

//       expect(() => person.update(null as any)).toThrow(EntityValidationError);
//       expect(() => person.update('')).toThrow(EntityValidationError);
//     });

//     it('should return a valid person', () => {
//       expect.assertions(0);
//       const person = new Person({ name: 'some-person' });
//       person.update('person 1');
//     });
//   });
// });

describe('Physical Person integration tests', () => {
  describe('should validate on create', () => {
    it('should throw an error on invalid person on create', async () => {
      const props = {
        name: 'some name',
        bornDate: 'some date' as any,
        cpf: 'auehaueh',
        genre: 'A',
      };
      const spyVlidateGenericPerson = jest.spyOn(Person, 'create');
      expect(() => PhysicalPerson.create(props)).rejects.toThrow(
        EntityValidationError,
      );
      expect(spyVlidateGenericPerson).toHaveBeenCalledWith(props);
      expect(spyVlidateGenericPerson).toHaveBeenCalledTimes(1);

      expect(() =>
        PhysicalPerson.create({
          name: 'some name',
          bornDate: undefined as any,
          cpf: 'auehaueh',
          genre: 'A',
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        PhysicalPerson.create({
          name: 'some name',
          bornDate: null as any,
          cpf: 'auehaueh',
          genre: 'A',
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        PhysicalPerson.create({
          name: 'some name',
          bornDate: new Date(),
          cpf: 'auehaueh'.repeat(3),
          genre: 'A',
        }),
      ).rejects.toThrow(EntityValidationError);

      expect(() =>
        PhysicalPerson.create({
          name: 'some name',
          bornDate: new Date(),
          cpf: 'a'.repeat(11),
          genre: 'A'.repeat(123),
        }),
      ).rejects.toThrow(EntityValidationError);
    });
  });

  describe('should validate on update', () => {
    it('should throw an error on invalid person on update', async () => {
      const person = await PhysicalPerson.create({
        name: 'some-person',
        bornDate: new Date(),
        cpf: '1'.repeat(11),
        genre: 'A',
      });
      const spyVlidateGenericPerson = jest.spyOn(Person.prototype, 'update');

      expect(async () => {
        await person.update(undefined as any, '', null as any, null as any);
      }).rejects.toThrow(EntityValidationError);
      expect(spyVlidateGenericPerson).toHaveBeenCalledWith(undefined);
      expect(spyVlidateGenericPerson).toHaveBeenCalledTimes(1);

      expect(async () => {
        await person.update('new Name', null as any, null as any, null as any);
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await person.update(
          'new Name',
          '1'.repeat(1),
          null as any,
          null as any,
        );
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await person.update('new Name', '1'.repeat(1), new Date(), null as any);
      }).rejects.toThrow(EntityValidationError);
    });
  });

  it('should return a valid physical person', async () => {
    const props = {
      name: 'some-person',
      bornDate: new Date(),
      cpf: '1'.repeat(11),
      genre: 'A',
    };
    const person = await PhysicalPerson.create(props);

    expect(person.cpf).toBe(props.cpf);
    expect(person.bornDate).toEqual(props.bornDate);
    expect(person.genre).toBe(props.genre);

    const updatedName = 'updated name';
    const updatedCpf = '2'.repeat(11);
    const updatedBornDate = new Date();
    const updatedGenre = 'B';

    await person.update(updatedName, updatedCpf, updatedBornDate, updatedGenre);

    expect(person.person.name).toBe(updatedName);
    expect(person.cpf).toBe(updatedCpf);
    expect(person.bornDate).toEqual(updatedBornDate);
    expect(person.genre).toBe(updatedGenre);
  });
});
