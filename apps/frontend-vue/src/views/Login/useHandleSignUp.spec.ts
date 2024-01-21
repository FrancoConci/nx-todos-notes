import type { AxiosInstance } from 'axios';
import { useHandleSignUp } from './useHandleSignUp';

const delay =
  <T>(value: T, mustThrow = false, ms = 10): (() => Promise<{ data: T }>) =>
  () =>
    new Promise<{ data: T }>((res, rej) =>
      setTimeout(() => {
        if (mustThrow) return rej('value');
        return res({ data: value });
      }, ms)
    );

const mocks = vi.hoisted(() => ({
  mockAxiosInstance: {
    request: () =>
      new Promise<{ data: string }>((res) => {
        setTimeout(() => {
          return res({ data: 'value' });
        }, 10);
      }),
  } as unknown as AxiosInstance,
}));

describe.each([
  {
    description: 'returns signupRequest, loading, error, response',
  },
])('useHandleLogin', ({ description }) => {
  it(`${description}`, async () => {
    const { signupRequest, loading, error, response } = useHandleSignUp(
      mocks.mockAxiosInstance
    );
    expect(signupRequest).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
    expect(response).toBeDefined();
  });
});

describe.each([
  {
    description: 'signupRequest sets loading, then returns value',
    newReturnValue: delay('banana'),
    username: 'username',
    password: 'password',
    expectedValue: 'banana',
    expectedError: null,
  },
  {
    description: 'signupRequest sets loading, then returns error',
    newReturnValue: delay('banana', true),
    username: 'username',
    password: 'password',
    expectedValue: null,
    expectedError: 'value',
  },
])(
  'signupRequest',
  ({
    description,
    newReturnValue,
    username,
    password,
    expectedError,
    expectedValue,
  }) => {
    beforeEach(() => {
      vi.resetAllMocks();
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });
    it(`${description}`, async () => {
      mocks.mockAxiosInstance = { request: newReturnValue };
      const { signupRequest, loading, error, response } = useHandleSignUp(
        mocks.mockAxiosInstance
      );

      expect(loading.value).toBe(false);
      expect(response.value).toBeNull();
      expect(error.value).toBeNull();

      signupRequest(username, password);

      expect(loading.value).toBe(true);
      expect(response.value).toBeNull();
      expect(error.value).toBeNull();

      await vi.advanceTimersByTimeAsync(10);

      expect(loading.value).toBe(false);
      expect(response.value).toBe(expectedValue);
      expect(error.value).toBe(expectedError);
    });
  }
);

describe.each([
  {
    description: 'signupRequest is not called if username is nullish',
    username: null,
    password: 'password',
  },
  {
    description: 'signupRequest is not called if password is nullish',
    username: 'username',
    password: null,
  },
])('signupRequest', ({ description, username, password }) => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it(`${description}`, async () => {
    const { signupRequest, loading, error, response } = useHandleSignUp(
      mocks.mockAxiosInstance
    );

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();

    signupRequest(username as string, password as string);

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();

    await vi.advanceTimersByTimeAsync(10);

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();
  });
});
