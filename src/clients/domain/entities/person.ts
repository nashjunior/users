import 'reflect-metadata';
import { Entity } from '../../../@seedwork/domain/entities';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects';
import { PersonValidatorFactory } from '../validators';
import { EntityValidationError } from '../../../@seedwork/domain/errors';

export type IPersonProps = { name: string; createdAt?: Date };

export class Person extends Entity<IPersonProps> {
  private constructor(
    public readonly props: IPersonProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);

    this.name = props.name;
  }

  // private static validate(props: Pick<IPersonProps, 'name'>) {
  //   ValidatorRules.withValues(props.name, 'name').string().isRequired();
  // }

  static async create(props: IPersonProps, id?: UniqueEntityId) {
    await Person.validate(props);

    return new Person(props, id);
  }

  private static async validate(props: Pick<IPersonProps, 'name'>) {
    const validator = PersonValidatorFactory.create();
    const isValid = await validator.validate(props);

    if (isValid === false) throw new EntityValidationError(validator.errors);
  }

  async update(name: string): Promise<void> {
    await Person.validate({ name: name });
    this.name = name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get name() {
    return this.props.name;
  }
}
