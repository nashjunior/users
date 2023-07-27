import { EntityValidationError } from '../../../../@seedwork/domain/errors';
import { Person } from '../person';
import 'reflect-metadata';

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

describe('Person integration tests', () => {
  describe('should validate on create', () => {
    it('should throw an error on invalid person on create', async () => {
      expect(() => Person.create({ name: undefined as any })).rejects.toThrow(
        EntityValidationError,
      );

      expect(() => Person.create({ name: null as any })).rejects.toThrow(
        EntityValidationError,
      );

      expect(async () => Person.create({ name: '' as any })).rejects.toThrow(
        EntityValidationError,
      );
    });
  });

  describe('should validate on update', () => {
    it('should throw an error on invalid person on create', async () => {
      const person = await Person.create({ name: 'some-person' });

      expect(async () => {
        await person.update(undefined as any);
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await person.update(null as any);
      }).rejects.toThrow(EntityValidationError);
      expect(async () => {
        await person.update('');
      }).rejects.toThrow(EntityValidationError);
    });

    it('should return a valid person', async () => {
      expect.assertions(0);
      const person = await Person.create({ name: 'some-person' });
      person.update('person 1');
    });
  });
});
