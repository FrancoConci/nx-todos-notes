import { sharedErrors } from './shared-errors';

describe('sharedErrors', () => {
  it('should work', () => {
    expect(sharedErrors()).toEqual('shared-errors');
  });
});
