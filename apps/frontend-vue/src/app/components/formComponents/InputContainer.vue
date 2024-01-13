<script setup lang="ts">
import Input from './Input.vue';
import type { TInputProperties } from './types';
const { inputConfig, label } = defineProps<{
  inputConfig: TInputProperties;
  label: string;
}>();
const { name } = inputConfig;
const id = `input-${name}`;
const value = defineModel('value');
</script>
<template>
  <div :class="$style.container">
    <label
      :data-testid="`form-component-label-element-${name}`"
      :class="$style.label"
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
      :class="$style.error"
      :for="id"
    >
      {{ label }}
    </span>
  </div>
</template>
<style module>
@value centered from '../../../styles.css';

.container {
  composes: centered;
  flex-direction: column;
}

.label {
  align-self: start;
  font-size: var(--caption);
}

.error {
  composes: label;
  color: var(--danger-main);
}
</style>
