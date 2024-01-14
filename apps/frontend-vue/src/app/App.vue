<script setup lang="ts">
import { RouterView } from 'vue-router';
import AxiosProvider from './providers/AxiosProvider.vue';
import ErrorsList from './components/apiErrors/ErrorsList.vue';
</script>

<template>
  <div
    class="flex flex-1 max-h-screen min-w-screen p-0 m-0 bg-light-primary-main dark:bg-dark-primary-main"
  >
    <AxiosProvider>
      <ErrorsList> </ErrorsList>
      <RouterView />
    </AxiosProvider>
  </div>
</template>
