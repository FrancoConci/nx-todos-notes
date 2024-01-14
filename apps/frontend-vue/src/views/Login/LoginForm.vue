<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { inject, ref } from 'vue';
import { login } from '../../api/auth/login';
import InputContainer from '../../app/components/formComponents/InputContainer.vue';
import { passwordConfig, usernameConfig } from './constants';
const password = ref('');
const username = ref('');

const axiosInstance = inject<AxiosInstance>('axiosInstance');
const loginWithAxios = login(axiosInstance);
const onSubmit = () => loginWithAxios(username.value, password.value);
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
      :inputConfig="usernameConfig"
      label="User name"
      v-model:value="username"
    />
    <InputContainer
      data-testid="login-form-password"
      :inputConfig="passwordConfig"
      label="Password"
      v-model:value="password"
    />
  </form>
</template>
