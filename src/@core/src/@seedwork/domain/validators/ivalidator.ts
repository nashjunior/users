export type IErrorField = { [field: string]: string[] };

export interface IValidatorFields<PropsValidated> {
  errors: IErrorField;
  validatedData: PropsValidated;
  validate(data: any): boolean | Promise<boolean>;
}
