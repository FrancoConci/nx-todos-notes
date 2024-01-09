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
</script>
<template>
  <form
    data-testid="login-form"
    @submit.prevent="() => loginWithAxios(username, password)"
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
