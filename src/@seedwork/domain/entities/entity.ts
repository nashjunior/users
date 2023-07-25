import { Audit, IAuditProps } from '../value-objects/audit';
import { UniqueEntityId } from '../value-objects/unique-id';

type IDateProps =
  | { createdAt?: Date; updatedAt?: Date; deletedAt?: Date }
  | undefined;

export class Entity<Props> {
  public readonly uniqueEntityID: UniqueEntityId;

  public readonly auditValueObject: Audit;

  constructor(public readonly props: IDateProps & Props, id?: UniqueEntityId) {
    this.uniqueEntityID == id || new UniqueEntityId();
    this.auditValueObject = new Audit({
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt,
      deletedAt: props?.deletedAt,
    });
  }

  get uuid() {
    return this.uniqueEntityID.value;
  }

  get createdAt() {
    return this.auditValueObject.value.createdAt;
  }

  get updatedAt() {
    return this.auditValueObject.value.updatedAt;
  }

  get deletedAt() {
    return this.auditValueObject.value.deletedAt;
  }

  toJSON(): Props & IAuditProps & { uuid: string } {
    return {
      ...this.props,
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
