import { Entity } from '../../../@seedwork/domain/entities';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects';
import { Person } from './person';
import { PhysicalPersonValidatorFactory } from '../validators';
import { EntityValidationError } from '../../../@seedwork/domain/errors';

export type IPersonProps = {
  name: string;
  cpf: string;
  genre: string;
  bornDate: Date;
  createdAt?: Date;
};

export class PhysicalPerson extends Entity<IPersonProps> {
  private personValueObject: Person;

  private constructor(
    public readonly props: IPersonProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.cpf = props.cpf;
    this.genre = props.genre;
    this.bornDate = props.bornDate;
  }

  static async create(props: IPersonProps, id?: UniqueEntityId) {
    const personInstance = await Person.create(props);
    await PhysicalPerson.validate(props);

    const physicalPersonInstance = new PhysicalPerson(props, id);
    physicalPersonInstance.person = personInstance;

    return physicalPersonInstance;
  }

  // private static async validate(
  //   props: Omit<IPersonProps, 'createdAt' | 'name'>,
  // ) {
  //   ValidatorRules.withValues(props.cpf, 'cpf ').string().isRequired();
  //   ValidatorRules.withValues(props.genre, 'genre ').string().isRequired();
  //   ValidatorRules.withValues(props.bornDate, 'born_date ').date().isRequired();
  // }

  private static async validate(
    props: Omit<IPersonProps, 'createdAt' | 'name'>,
  ) {
    const validator = PhysicalPersonValidatorFactory.create();
    const isValid = await validator.validate(props);

    if (isValid === false) throw new EntityValidationError(validator.errors);
  }

  async update(
    name: string,
    cpf: string,
    bornDate: Date,
    genre: string,
  ): Promise<void> {
    await this.person.update(name);
    await PhysicalPerson.validate({ cpf, bornDate, genre });
    this.cpf = cpf;
    this.genre = genre;
    this.bornDate = bornDate;
  }

  get person() {
    return this.personValueObject;
  }

  private set person(props: Person) {
    this.personValueObject = props;
  }

  private set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get cpf() {
    return this.props.cpf;
  }

  private set genre(genre: string) {
    this.props.genre = genre;
  }

  get genre() {
    return this.props.genre;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get name() {
    return this.props.name;
  }

  private set bornDate(date: Date) {
    this.props.bornDate = date;
  }

  get bornDate() {
    return this.props.bornDate;
  }
}
