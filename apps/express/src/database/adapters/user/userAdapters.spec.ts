import { User } from '../../mongoose/models/user';
import {
  defaultUser,
  defaultUserId,
  setupDb,
  teardownDb,
} from '../../testSetup/utils';
import {
  createUserAdapter,
  deleteUserAdapter,
  getUserByIdAdapter,
  updateUserAdapter,
} from './userAdapters';

beforeAll(async () => await setupDb());
afterAll(async () => await teardownDb());

const validUnsavedUser = { username: 'somUserName' };

const invalidIds = [
  { id: null },
  { id: undefined },
  { id: 1 },
  { id: 'userIdThatDoesNotExist' },
  { id: true },
  { id: false },
  { id: [] },
  { id: {} },
];

const invalidUsers = [
  {
    user: null,
  },
  {
    user: {},
  },
  {
    user: true,
  },
  {
    user: false,
  },
  {
    user: false,
  },
  {
    user: [],
  },
  {
    user: 'asd',
  },
];

describe.each([{ unsavedUser: validUnsavedUser }])(
  'createUserAdapter(...user)',
  ({ unsavedUser }) => {
    test(`returns a new user: ${unsavedUser.username}`, async () => {
      const user = await createUserAdapter(unsavedUser);
      expect(user.username).toEqual(unsavedUser.username);
    });
  }
);

describe.each([{ id: defaultUserId, expected: defaultUser }])(
  'getUserById($id)',
  ({ id, expected }) => {
    test(`returns ${expected}`, async () => {
      const user = await getUserByIdAdapter(id);
      expect(user).toEqual(expected);
    });
  }
);

describe.each([{ updatedUser: { ...defaultUser, ...validUnsavedUser } }])(
  'updateUserAdapter(...user)',
  ({ updatedUser }) => {
    test(`returns an updated user: ${updatedUser.username}`, async () => {
      const user = await updateUserAdapter(updatedUser);
      expect(user.id).toEqual(defaultUser.id);
      expect(user.username).toEqual(updatedUser.username);
    });
  }
);

describe.each([{ userToCreate: validUnsavedUser }])(
  'deleteUserAdapter(...user)',
  ({ userToCreate }) => {
    test(`deletes user and returns its id: ${userToCreate.username}`, async () => {
      const newUser = await createUserAdapter(userToCreate);
      const deletedUserId = await deleteUserAdapter(newUser.id);
      expect(deletedUserId).toEqual(newUser.id);
      const retrievedUser = async () => await getUserByIdAdapter(deletedUserId);
      expect(retrievedUser).rejects.toThrow();
    });
  }
);

describe.each(invalidIds)('getUserByIdAdapter($id)', ({ id }) => {
  test('throws an error', async () => {
    const func = async () => {
      await getUserByIdAdapter(id as unknown as string);
    };
    expect(func).rejects.toThrow();
  });
});

describe.each(invalidIds)('deleteUserAdapter($id)', ({ id }) => {
  test('throws an error', async () => {
    const func = async () => {
      await deleteUserAdapter(id as unknown as string);
    };
    expect(func).rejects.toThrow();
  });
});

describe.each(invalidUsers)('createUserAdapter($user)', ({ user }) => {
  test('throws an error', async () => {
    const func = async () => {
      await createUserAdapter(user as unknown as User);
    };
    expect(func).rejects.toThrow();
  });
});

describe.each(invalidUsers)('updateUserAdapter($user)', ({ user }) => {
  test('throws an error', async () => {
    const func = async () => {
      await updateUserAdapter(user as unknown as User);
    };
    expect(func).rejects.toThrow();
  });
});
