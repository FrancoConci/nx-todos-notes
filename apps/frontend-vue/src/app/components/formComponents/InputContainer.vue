<script setup lang="ts">
import Input from './Input.vue';
import type { TInputProperties } from './types';
const { inputConfig, label, error } = defineProps<{
  inputConfig: TInputProperties;
  label: string;
  error: string;
}>();
const { name } = inputConfig;
const id = `input-${name}`;
const value = defineModel('value');
</script>
<template>
  <div class="flex flex-col items-start justify-center">
    <label
      :data-testid="`form-component-label-element-${name}`"
      class="text-sm text-light-secondary-main dark:text-dark-secondary-main h-5"
      :for="id"
      >{{ label }}</label
    >
    <Input
      :data-testid="`form-component-input-element-${name}`"
      :id="id"
      :inputConfig="inputConfig"
      v-model:value="value"
    />
    <span
      :data-testid="`form-component-error-element-${name}`"
      class="text-sm text-light-danger-main dark:text-dark-danger-main h-5"
      :for="id"
    >
      {{ error }}
    </span>
  </div>
</template>
