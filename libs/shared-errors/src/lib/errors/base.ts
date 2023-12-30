export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = 'Base_Error';
    this.message = message;
  }
}
