import { User } from '@demo/rest-api-models';
import { User as mongooseUser } from '../../../mongoose/models/user';

export const isUser = (item: any): item is User => {
  if (!item) return false;
  if (item instanceof mongooseUser) return true;

  const { id, username, password } = item;
  return [id, username, password].every((prop) => !!prop);
};
