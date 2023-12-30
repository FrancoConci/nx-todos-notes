import { fnOrUserRetrieveError, UserRetrieveError } from './user';

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
])('fnOrUserRetrieveError', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrUserRetrieveError<string>(spy);
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    spy: funcThatThrows,
    error: UserRetrieveError,
  },
])('fnOrUserRetrieveError', ({ spy, error }) => {
  it('throws if needed', () => {
    const value = fnOrUserRetrieveError<string>(spy);
    expect(value).toBeInstanceOf(error);
  });
});
