import { TUnsavedUser } from '../../adapters/user/types';
import { User } from './user';

describe.each([{ id: 'id', username: 'user', _id: 'asd' }])(
  'instantiate User class',
  ({ id, username, _id }) => {
    test(`with id: ${id} and username ${username}, _id: ${_id}`, () => {
      const unsavedUser = {
        id,
        username,
        _id,
      } as unknown as TUnsavedUser;
      const newUser = new User(unsavedUser);
      expect(newUser).toBeInstanceOf(User);
      expect(newUser.id).toEqual(id);
      expect(newUser.username).toEqual(username);
      expect((newUser as unknown as any).thirdProp).toBeUndefined();
    });
  }
);
