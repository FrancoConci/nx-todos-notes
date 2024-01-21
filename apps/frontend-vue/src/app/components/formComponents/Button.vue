<script setup lang="ts">
import { type TButtonProps } from './types';

const {
  autofocus = false,
  disabled = false,
  name,
  type = 'button',
  value = '',
  color = 'alert',
} = defineProps<TButtonProps>();

const borderColors = {
  secondary: {
    light: 'border-light-secondary-main',
    dark: 'border-dark-secondary-main',
  },
  alert: { light: 'border-light-alert-main', dark: 'border-dark-alert-main' },
  danger: {
    light: 'border-light-danger-main',
    dark: 'border-dark-danger-main',
  },
};
const textColors = {
  secondary: {
    light: 'text-light-secondary-main',
    dark: 'text-dark-secondary-main',
  },
  alert: { light: 'text-light-alert-main', dark: 'text-dark-alert-main' },
  danger: { light: 'text-light-danger-main', dark: 'text-dark-danger-main' },
};
</script>
<template>
  <button
    :autofocus="autofocus"
    :disabled="disabled"
    :name="name"
    :type="type"
    :value="value"
    :class="`flex align-middle justify-center
      border rounded-md border-solid p-1
      ${borderColors[color].light} dark:${borderColors[color].dark}
      disabled:${borderColors[color].light} disabled:dark:${borderColors[color].dark}
      read-only:${borderColors[color].light} read-only:dark:${borderColors[color].dark}

      bg-light-primary-main dark:bg-dark-primary-main
      disabled:bg-light-primary-main dark:disabled:bg-dark-primary-dark
      text-light-contrast dark:text-dark-contrast
      cursor-pointer disabled:cursor-not-allowed
      focus:outline-light-secondary-main dark:focus:outline-dark-secondary-main
      focus-visible:outline-light-secondary-main dark:focus-visible:outline-dark-secondary-main
      shadow-md disabled:shadow-none
      shadow-light-contrast-dark dark:shadow-dark-primary-dark
      w-full
      `"
  >
    <h3 :class="`${textColors[color].light} dark:${textColors[color].dark}`">
      {{ name }}
    </h3>
  </button>
</template>
