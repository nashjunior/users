import { Entity } from '../../../@seedwork/domain/entities';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects';
import { Person } from './person';

import { EntityValidationError } from '../../../@seedwork/domain/errors';
import { LegalPersonValidatorFactory } from '../validators';

export type IPersonProps = {
  name: string;
  cnpj: string;
  foundationDate: Date;
  createdAt?: Date;
};

export class LegalPerson extends Entity<IPersonProps> {
  private personValueObject: Person;

  private constructor(
    public readonly props: IPersonProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.cnpj = props.cnpj;
    this.foundationDate = props.foundationDate;
  }

  static async create(props: IPersonProps, id?: UniqueEntityId) {
    const personInstance = await Person.create(props);
    await LegalPerson.validate(props);

    const physicalPersonInstance = new LegalPerson(props, id);
    physicalPersonInstance.person = personInstance;

    return physicalPersonInstance;
  }

  private static async validate(
    props: Omit<IPersonProps, 'createdAt' | 'name'>,
  ) {
    const validator = LegalPersonValidatorFactory.create();

    const isValid = await validator.validate(props);

    if (isValid === false) throw new EntityValidationError(validator.errors);
  }

  async update(
    name: string,
    cnpj: string,
    foundationDate: Date,
  ): Promise<void> {
    await this.person.update(name);
    await LegalPerson.validate({ cnpj, foundationDate });
    this.cnpj = cnpj;
    this.foundationDate = foundationDate;
  }

  get person() {
    return this.personValueObject;
  }

  private set person(props: Person) {
    this.personValueObject = props;
  }

  private set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get name() {
    return this.props.name;
  }

  private set foundationDate(date: Date) {
    this.props.foundationDate = date;
  }

  get foundationDate() {
    return this.props.foundationDate;
  }
}
