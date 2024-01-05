<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AxiosProvider from './providers/AxiosProvider.vue';
import ErrorsList from './components/apiErrors/ErrorsList.vue';
</script>

<template>
  <AxiosProvider>
    <ErrorsList> </ErrorsList>
    <RouterView />
  </AxiosProvider>
</template>
