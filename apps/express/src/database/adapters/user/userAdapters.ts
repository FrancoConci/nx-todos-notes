import {
  UserCreateError,
  UserRetrieveError,
  UserUpdateError,
  fnOrUserCreateError,
  fnOrUserRetrieveError,
  fnOrUserUpdateError,
} from '@demo/shared-errors';
import { User, userModel } from '../../mongoose/models/user';
import { TUnsavedUser } from './types';
import { isUser } from './validators/validator.utils';
import { UpdateUserObj } from './validators/validators.classes';

export const findUserById = async (id: string) => {
  const query = () => userModel.findOne({ id: id });
  const user = await fnOrUserRetrieveError(query);
  if (!isUser(user)) {
    throw new UserRetrieveError('no user with this id');
  }
  return user;
};

export const findUserViaLogin = async (username: string, password: string) => {
  const query = () => userModel.findOne({ username, password });
  const user = await fnOrUserRetrieveError(query);
  if (!isUser(user)) {
    return new UserRetrieveError('no user with this username, password');
  }
  return user;
};

export const createUserAdapter = async (user: TUnsavedUser) => {
  const newUser = new User(user);
  const query = () => userModel.create(newUser);
  const createdUser = await fnOrUserCreateError(query);
  if (createdUser instanceof UserCreateError) throw createdUser;
  return new User(await createdUser.save());
};

export const getUserByIdAdapter = async (id: string) => {
  const user = await findUserById(id);
  if (user instanceof UserRetrieveError) throw user;
  return new User(user);
};

export const updateUserAdapter = async (user: TUnsavedUser) => {
  const retrievedUser = await findUserById(user.id);
  const updatedUser = new User({
    ...new User(retrievedUser),
    ...new UpdateUserObj(user),
  });
  const query = () => userModel.updateOne({ id: updatedUser.id }, updatedUser);
  const result = await fnOrUserUpdateError(query);
  if (result instanceof UserUpdateError) throw result;
  if (result.acknowledged) return updatedUser;
};

export const deleteUserAdapter = async (id: string) => {
  const user = await findUserById(id);
  await userModel.deleteOne(user._id);
  return id;
};
