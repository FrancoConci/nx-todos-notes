import { User } from '../../../mongoose/models/user';

export interface IUserUpdateObj extends Pick<User, 'username'> {}
