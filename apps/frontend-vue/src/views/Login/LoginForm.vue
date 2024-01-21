<script setup lang="ts">
import { ref } from 'vue';
import InputContainer from '../../app/components/formComponents/InputContainer.vue';
import { passwordConfig, usernameConfig } from './constants';
import { useHandleLogin } from './useHandleLogin';
import { useLoginValidation } from './useLoginValidation';

const password = ref('');
const username = ref('');
const { loginRequest, loading, response, error } = useHandleLogin();
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
      :inputConfig="{ ...usernameConfig, disabled: loading }"
      label="User name"
      :error="usernameErr"
      v-model:value="username"
    />
    <InputContainer
      data-testid="login-form-password"
      :inputConfig="{ ...passwordConfig, disabled: loading }"
      label="Password"
      :error="passwordErr"
      v-model:value="password"
    />
  </form>
</template>
