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

const fromColors = {
  secondary: {
    light: 'from-light-primary-main',
    dark: 'from-dark-primary-main',
  },
  alert: {
    light: 'from-light-alert-main',
    dark: 'from-dark-alert-main',
  },
  danger: {
    light: 'from-light-danger-main',
    dark: 'from-dark-danger-main',
  },
};

const toColors = {
  secondary: {
    light: 'to-light-secondary-main',
    dark: 'to-dark-secondary-main',
  },
  alert: {
    light: 'to-light-alert-main',
    dark: 'to-dark-alert-main',
  },
  danger: {
    light: 'to-light-danger-main',
    dark: 'to-dark-danger-main',
  },
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
      hover:scale-[1.025]
      active:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]   ${fromColors[color].light}  ${toColors[color].light}
      dark:active:bg-[radial-gradient(ellipse_at_center, _var(--tw-gradient-stops))]  dark:${fromColors[color].dark}   dark:${toColors[color].dark}
      `"
  >
    <h3 :class="`${textColors[color].light} dark:${textColors[color].dark}`">
      {{ name }}
    </h3>
  </button>
</template>
