export abstract class ValueObject<T = any> {
  protected _propValue: T;

  constructor(prop: T) {
    this._propValue = Object.freeze(prop);
  }

  get value() {
    return this._propValue;
  }

  toString() {
    if (!this.value) return '';

    switch (typeof this.value) {
      case 'object':
        return JSON.stringify(this.value);

      case 'boolean':
        return this.value === true ? 'true' : 'false';

      default:
        try {
          return this.value.toString();
        } catch (error) {
          return this.value + '';
        }
    }
  }
}
