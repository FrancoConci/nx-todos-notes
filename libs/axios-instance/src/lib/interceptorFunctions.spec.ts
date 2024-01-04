import { AxiosError, AxiosResponse } from 'axios';
import { rejectHandler, responseHandler } from './interceptorFunctions';

describe.each([
  {
    response: 'asd',
    expected: 'asd',
  },
])('responseHandler', ({ response, expected }) => {
  it(`returns expected response ${response}`, () => {
    expect(responseHandler(response as unknown as AxiosResponse)).toStrictEqual(
      expected
    );
  });
});

const spyObject = {
  setErrotToState: jest.fn,
};
const spyFunction = jest.spyOn(spyObject, 'setErrotToState');

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetAllMocks();
});
describe.each([
  {
    error: 'asd',
    expected: 'asd',
  },
])('rejectHandler', ({ error, expected }) => {
  it(`returns expected error ${error} and calls setErrorToState with it`, async () => {
    await rejectHandler(
      spyFunction as unknown as (id: string, message: string) => void
    )(error as unknown as AxiosError).catch((err) => {
      expect(err).toStrictEqual(expected);
    });
    expect(spyFunction).toHaveBeenCalled();
  });
});
