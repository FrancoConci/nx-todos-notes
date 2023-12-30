import { model } from 'mongoose';
import { userSchema } from '../schemas/user/user';
import { randomUUID } from 'crypto';
import { TUnsavedUser } from '../../adapters/user/types';
import { User as IUser } from '@demo/rest-api-models';

export const userModel = model('user', userSchema);

export class User implements IUser {
  public id: string;
  public username: string;
  public password: string;
  constructor({
    id = randomUUID(),
    username,
    password = 'password',
  }: TUnsavedUser) {
    if (!id || !username) throw new Error('invalid user initialization');
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
