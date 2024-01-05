<script setup lang="ts">
import type { TInputProperties } from './types';

const { inputConfig } = defineProps<{ inputConfig: TInputProperties }>();
const {
  name,
  type = 'string',
  checked = false,
  disabled = false,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  placeholder = name,
  readonly = false,
  required = false,
} = inputConfig;
const value = defineModel('value');
</script>
<template>
  <input
    :class="$style.input"
    :data-testid="`input-${name}`"
    v-model="value"
    :name="name"
    :type="type"
    :checked="checked"
    :disabled="disabled"
    :max="max"
    :maxLength="maxLength"
    :min="min"
    :minLength="minLength"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
  />
</template>
<style module>
@value centered from '../../../styles.css';

.input {
  composes: centered;
  justify-content: left;
  min-height: 46px;
  width: clamp(256px, 40vw, 800px);
  border: solid 1px var(--secondary-main);
  border-radius: var(--spacing4);
  background-color: var(--primary-main);
  box-shadow: -4px 4px 4px var(--primary-dark);
  padding: 0px var(--spacing8);
  color: var(--contrast);
}

.input:focus-visible {
  border-color: var(--secondary-saturated);
  border-width: 2px;
  outline: none;
}

.input::placeholder {
  color: var(--contrast-light);
}

.input:disabled,
.input:read-only {
  box-shadow: none;
  border-color: var(--secondary-dark);
}
</style>
