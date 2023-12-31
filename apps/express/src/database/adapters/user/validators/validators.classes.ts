import { randomUUID } from 'crypto';
import { User } from '../../../mongoose/models/user';
import { TUnsavedUser } from '../types';
import { IUserUpdateObj } from './validators.types';

export class UpdateUserObj implements IUserUpdateObj {
  constructor(user: User | TUnsavedUser) {
    this.username = user.username || randomUUID();
    return { username: this.username };
  }
  public username: string;
}
