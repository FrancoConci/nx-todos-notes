import type { AxiosInstance } from 'axios';
import { useHandleLogin } from './useHandleLogin';

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
    description: 'returns loginRequest, loading, error, response',
  },
])('useHandleLogin', ({ description }) => {
  it(`${description}`, async () => {
    const { loginRequest, loading, error, response } = useHandleLogin(
      mocks.mockAxiosInstance
    );
    expect(loginRequest).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
    expect(response).toBeDefined();
  });
});

describe.each([
  {
    description: 'loginRequest sets loading, then returns value',
    newReturnValue: delay('banana'),
    username: 'username',
    password: 'password',
    expectedValue: 'banana',
    expectedError: null,
  },
  {
    description: 'loginRequest sets loading, then returns error',
    newReturnValue: delay('banana', true),
    username: 'username',
    password: 'password',
    expectedValue: null,
    expectedError: 'value',
  },
])(
  'loginRequest',
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
      const { loginRequest, loading, error, response } = useHandleLogin(
        mocks.mockAxiosInstance
      );

      expect(loading.value).toBe(false);
      expect(response.value).toBeNull();
      expect(error.value).toBeNull();

      loginRequest(username, password);

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
    description: 'loginRequest is not called if username is nullish',
    username: null,
    password: 'password',
  },
  {
    description: 'loginRequest is not called if password is nullish',
    username: 'username',
    password: null,
  },
])('loginRequest', ({ description, username, password }) => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it(`${description}`, async () => {
    const { loginRequest, loading, error, response } = useHandleLogin(
      mocks.mockAxiosInstance
    );

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();

    loginRequest(username as string, password as string);

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();

    await vi.advanceTimersByTimeAsync(10);

    expect(loading.value).toBe(false);
    expect(response.value).toBeNull();
    expect(error.value).toBeNull();
  });
});
