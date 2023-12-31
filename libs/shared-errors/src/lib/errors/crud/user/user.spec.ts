import {
  fnOrUserCreateError,
  fnOrUserRetrieveError,
  fnOrUserUpdateError,
  UserCreateError,
  UserRetrieveError,
  UserUpdateError,
} from './user';

beforeEach(() => {
  jest.restoreAllMocks();
});

const expectedMessage = 'expectedMessage';

const func = () => expectedMessage;
const funcThatThrows = () => {
  throw new Error(expectedMessage);
};

describe.each([
  {
    func: func,
    error: UserRetrieveError,
  },
  {
    func: func,
    error: UserCreateError,
  },
])('fnOrUserRetrieveError', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrUserRetrieveError<string>(spy);
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    func: func,
    error: UserCreateError,
  },
])('fnOrUserCreateError', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrUserCreateError<string>(spy);
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    spy: funcThatThrows,
    error: UserCreateError,
  },
])('fnOrUserCreateError', ({ spy, error }) => {
  it('throws if needed', () => {
    const value = fnOrUserCreateError<string>(spy);
    expect(value).toBeInstanceOf(error);
  });
});

describe.each([
  {
    func: func,
    error: UserUpdateError,
  },
])('fnOrUserUpdateError', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrUserUpdateError<string>(spy);
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    spy: funcThatThrows,
    error: UserUpdateError,
  },
])('fnOrUserUpdateError', ({ spy, error }) => {
  it('throws if needed', () => {
    const value = fnOrUserUpdateError<string>(spy);
    expect(value).toBeInstanceOf(error);
  });
});
