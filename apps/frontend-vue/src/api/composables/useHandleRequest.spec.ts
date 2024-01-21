import type { AxiosInstance } from 'axios';
import { useHandleRequest } from './useHandleRequest';

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
    description: 'returns handleRequest, loading, error, response',
  },
])('useHandleRequest', ({ description }) => {
  it(`${description}`, async () => {
    const { handleRequest, loading, error, response } = useHandleRequest(
      mocks.mockAxiosInstance
    );
    expect(handleRequest).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
    expect(response).toBeDefined();
  });
});

describe.each([
  {
    description: 'handleRequest sets loading, then returns value',
    newReturnValue: delay('banana'),
    expectedValue: 'banana',
    expectedError: null,
  },
  {
    description: 'handleRequest sets loading, then returns error',
    newReturnValue: delay('banana', true),
    expectedValue: null,
    expectedError: 'value',
  },
])(
  'handleRequest',
  ({ description, newReturnValue, expectedError, expectedValue }) => {
    beforeEach(() => {
      vi.resetAllMocks();
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });
    it(`${description}`, async () => {
      mocks.mockAxiosInstance = { request: newReturnValue };
      const { handleRequest, loading, error, response } = useHandleRequest(
        mocks.mockAxiosInstance
      );

      expect(loading.value).toBe(false);
      expect(response.value).toBeNull();
      expect(error.value).toBeNull();

      handleRequest('GET', 'unimportant');

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
