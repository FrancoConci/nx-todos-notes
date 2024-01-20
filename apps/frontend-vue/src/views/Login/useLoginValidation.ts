import { ref, watch, type Ref } from 'vue';

export const useLoginValidation = (
  username: Ref<string>,
  password: Ref<string>
) => {
  const usernameErr = ref();
  const passwordErr = ref();

  watch(username, () => {
    usernameErr.value = username.value ? null : 'i am an error';
  });
  watch(password, () => {
    passwordErr.value = password.value ? null : 'i am an error';
  });

  return { usernameErr, passwordErr };
};
