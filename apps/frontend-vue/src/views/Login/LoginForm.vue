<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { inject, ref } from 'vue';
import Button from '../../app/components/formComponents/Button.vue';
import InputContainer from '../../app/components/formComponents/InputContainer.vue';
import { passwordConfig, usernameConfig } from './constants';
import { useHandleLogin } from './useHandleLogin';
import { useHandleSignUp } from './useHandleSignUp';
import { useLoginValidation } from './useLoginValidation';

const axiosInstance = inject<AxiosInstance>('axiosInstance');
const password = ref('');
const username = ref('');
const {
  loginRequest,
  loading: loginLoading,
  response: loginResponse,
  error: loginError,
} = useHandleLogin(axiosInstance);
const {
  signupRequest,
  loading: signupLoading,
  response: signupResponse,
  error: signupError,
} = useHandleSignUp(axiosInstance);
const { usernameErr, passwordErr } = useLoginValidation(username, password);

const onSubmit = () => loginRequest(username.value, password.value);
</script>
<template>
  <form
    data-testid="login-form"
    @keydown.enter="onSubmit"
    @submit.prevent="onSubmit"
    class="flex flex-1 flex-col self-center justify-center items-center p-spacing16 md:w-[50%] xl:w-[800px]"
  >
    <InputContainer
      data-testid="login-form-username"
      :inputConfig="{ ...usernameConfig, disabled: loginLoading }"
      label="User name"
      :error="usernameErr"
      v-model:value="username"
    />
    <InputContainer
      data-testid="login-form-password"
      :inputConfig="{ ...passwordConfig, disabled: loginLoading }"
      label="Password"
      :error="passwordErr"
      v-model:value="password"
    />
    <div class="flex flex-col w-full md:w-[265px]">
      <Button
        data-testid="login-button"
        class="mt-5"
        color="secondary"
        name="Let's go!"
        @click.prevent="loginRequest(username, password)"
      ></Button>
      <Button
        data-testid="signup-button"
        class="mt-5"
        color="secondary"
        name="Sign me Up!"
        @click.prevent="() => signupRequest(username, password)"
      ></Button>
    </div>
  </form>
</template>
