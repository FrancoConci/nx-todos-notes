<script setup lang="ts">
import { ref } from 'vue';
const theme = ref<'dark' | 'light'>('dark');
const toggleTeme = () => {
  const newValue = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.replace(theme.value, newValue);
  theme.value = newValue;
};
</script>
<template>
  <button @click="toggleTeme">theme is {{ theme }}</button>
</template>
