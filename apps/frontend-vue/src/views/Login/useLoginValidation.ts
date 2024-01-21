import { ref, watch, type Ref } from 'vue';

export const useLoginValidation = (
  username: Ref<string>,
  password: Ref<string>
) => {
  const usernameErr = ref('');
  const passwordErr = ref('');

  watch(username, () => {
    console.log('username.value', username.value);
    usernameErr.value = username.value ? '' : 'i am an error';
  });
  watch(password, () => {
    passwordErr.value = password.value ? '' : 'i am an error';
  });

  return { usernameErr, passwordErr };
};
