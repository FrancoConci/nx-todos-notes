import { fnOrThrowSync } from './fnOrThrowSync';

beforeEach(() => {
  jest.restoreAllMocks();
});

const expectedMessage = 'expectedMessage';
const testErrorMessage = 'TestError';
const derivedTestErrorMessage = 'DerivedTestError';

class TestError {
  message = testErrorMessage;
  isBase = true;
}

class DerivedTestError extends TestError {
  constructor() {
    super();
  }
  override message = derivedTestErrorMessage;
  override isBase = false;
  isDerived = true;
}

const func = () => expectedMessage;
const funcThatThrows = () => {
  throw new Error(expectedMessage);
};

describe.each([
  {
    func: func,
    error: TestError,
  },
])('fnOrThrowSync', ({ func: spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrThrowSync<string, TestError | DerivedTestError>(
      spy,
      error
    );
    expect(value).toStrictEqual(expectedMessage);
  });
});

describe.each([
  {
    spy: funcThatThrows,
    error: TestError,
  },
  {
    spy: funcThatThrows,
    error: DerivedTestError,
  },
])('fnOrThrowSync', ({ spy, error }) => {
  it('does not return error unnecessarily', () => {
    const value = fnOrThrowSync<string, TestError | DerivedTestError>(
      spy,
      error
    );
    expect(value).toBeInstanceOf(error);
  });
});
