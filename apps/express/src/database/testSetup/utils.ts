import { createUserAdapter } from '../adapters/user/userAdapters';
import { close, connect } from '../utils/utils';

export const defaultUserId = 'bananaId';
export const defaultUser = {
  id: defaultUserId,
  username: 'banana',
  password: 'bananaPassword',
};

export const setupDb = async () => {
  await connect();
  await populateDb();
};
export const populateDb = async () => {
  await createUserAdapter(defaultUser);
};
export const teardownDb = async () => {
  close();
};
