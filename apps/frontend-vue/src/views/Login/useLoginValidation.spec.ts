import { ref } from 'vue';
import { useLoginValidation } from './useLoginValidation';

describe('useLoginValidation', () => {
  it('returns no error, then returns error if fields are invalid', () => {
    const username = ref('');
    const password = ref('');
    const { usernameErr, passwordErr } = useLoginValidation(username, password);

    // no error if fields are not touched
    expect(usernameErr.value).toBeUndefined();
    expect(passwordErr.value).toBeUndefined();

    // touch fields
    username.value = 'asd';
    password.value = 'asd';

    // no error if fields are set to valid values
    expect(usernameErr.value).toBeUndefined();
    expect(passwordErr.value).toBeUndefined();

    // set fields to valid values
    username.value = '';
    password.value = '';

    // errors if fields are touched and invalid
    expect(usernameErr.value).toBeUndefined();
    expect(passwordErr.value).toBeUndefined();
  });
});
