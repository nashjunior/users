import { ValueObject } from './value-object';

export type IAuditProps = {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class Audit extends ValueObject<IAuditProps> {
  constructor(readonly props: IAuditProps) {
    super(props);
  }
}
