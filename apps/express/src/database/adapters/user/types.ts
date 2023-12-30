import { User as IUser } from '@demo/rest-api-models';

export type TUnsavedUser = Omit<IUser, 'id'> & {
  id?: string;
};
