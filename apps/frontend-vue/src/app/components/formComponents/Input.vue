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
    :class="`bg-light-primary-main dark:bg-dark-primary-main
    text-light-contrast dark:text-dark-contrast
    placeholder:italic placeholder-light-contrast dark:placeholder-dark-contrast
    box-border border border-solid p-1 rounded-md
    border-light-secondary-main dark:border-dark-secondary-main
    disabled:border-light-secondary-dark disabled:dark:border-dark-secondary-dark
    read-only:border-light-secondary-dark read-only:dark:border-dark-secondary-dark
    cursor-text disabled:cursor-not-allowed
    focus:outline-light-secondary-main dark:focus:outline-dark-secondary-main
    dark:autofill:bg-dark-secondary-dark
    autofill:shadow-light-color dark:autofill:shadow-dark-color
    autofill:!text-dark-danger-main
    focus-visible:outline-light-secondary-main dark:focus-visible:outline-dark-secondary-main
    shadow-md disabled:shadow-none read-only:shadow-none
    shadow-light-contrast-dark dark:shadow-dark-primary-dark
    hover:scale-[1.025]
    w-full md:w-[265px] h-inputHeight`"
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
<style>
html.dark input:-webkit-autofill,
html.dark input:-webkit-autofill:hover,
html.dark input:-webkit-autofill:focus,
html.dark textarea:-webkit-autofill,
html.dark textarea:-webkit-autofill:hover,
html.dark textarea:-webkit-autofill:focus,
html.dark select:-webkit-autofill,
html.dark select:-webkit-autofill:hover,
html.dark select:-webkit-autofill:focus {
  -webkit-text-fill-color: theme(colors.dark-contrast);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: theme(colors.light-contrast);
}
</style>
