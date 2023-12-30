import { fnOrThrowSync } from '../../../fnOrThrow/fnOrThrowSync';
import { BaseError } from '../../base';

export class UserRetrieveError extends BaseError {
  public override name = 'User_retrieve_Error';
  public scope = 'CRUD_User';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserRetrieveError.prototype);
    this.message = message;
  }
}

export const fnOrUserRetrieveError = <T>(fn: () => T): T | UserRetrieveError =>
  fnOrThrowSync<T, UserRetrieveError>(fn, UserRetrieveError);
