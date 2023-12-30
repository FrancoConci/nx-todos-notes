import { AuthError, fnOrAuthError } from './auth';

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
    error: AuthError,
  },
])('fnOrAuthError', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrAuthError<string | AuthError>(spy);
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    spy: funcThatThrows,
    error: AuthError,
  },
])('fnOrThrowSync', ({ spy, error }) => {
  it('throws if needed', () => {
    const value = fnOrAuthError<string | AuthError>(spy);
    expect(value).toBeInstanceOf(error);
  });
});
