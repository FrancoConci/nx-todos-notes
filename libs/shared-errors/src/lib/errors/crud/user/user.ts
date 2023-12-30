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

export class UserCreateError extends BaseError {
  public override name = 'User_create_Error';
  public scope = 'CRUD_User';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserCreateError.prototype);
    this.message = message;
  }
}

export const fnOrUserRetrieveError = <T>(fn: () => T): T | UserRetrieveError =>
  fnOrThrowSync<T, UserRetrieveError>(fn, UserRetrieveError);

export const fnOrUserCreateError = <T>(fn: () => T): T | UserRetrieveError =>
  fnOrThrowSync<T, UserCreateError>(fn, UserCreateError);
