import { fnOrThrowSync } from '../../fnOrThrow/fnOrThrowSync';
import { BaseError } from '../base';

export class AuthError extends BaseError {
  public override name = 'Auth_Error';
  public scope = 'Auth';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
    this.message = message;
  }
}

export const fnOrAuthError = <T>(fn: () => T): T | AuthError =>
  fnOrThrowSync<T, AuthError>(fn, AuthError);
