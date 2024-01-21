import { ref } from 'vue';
import { useLoginValidation } from './useLoginValidation';

describe('useLoginValidation', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it('returns no error, if untouched', async () => {
    const username = ref('');
    const password = ref('');
    const { usernameErr, passwordErr } = useLoginValidation(username, password);

    await vi.waitFor(() => vi.runAllTicks());

    // no error if fields are not touched
    expect(usernameErr.value).toBe('');
    expect(passwordErr.value).toBe('');
  });
  it('returns no error, if going from untouched to valid', async () => {
    const username = ref('');
    const password = ref('');
    const { usernameErr, passwordErr } = useLoginValidation(username, password);

    // touch fields
    username.value = 'asd';
    password.value = 'asd';

    await vi.waitFor(() => vi.runAllTicks());

    // no error if fields are set to valid values
    expect(usernameErr.value).toBe('');
    expect(passwordErr.value).toBe('');
  });
  it('returns error, if fields go from valid to invalid', async () => {
    const username = ref('asd');
    const password = ref('asd');
    const { usernameErr, passwordErr } = useLoginValidation(username, password);

    // set fields to invalid values
    username.value = '';
    password.value = '';

    await vi.waitFor(() => vi.runAllTicks());
    // errors if fields are touched and invalid
    expect(usernameErr.value).not.toBeUndefined();
    expect(usernameErr.value).not.toBe('');
    expect(passwordErr.value).not.toBeUndefined();
    expect(passwordErr.value).not.toBe('');
  });
});
