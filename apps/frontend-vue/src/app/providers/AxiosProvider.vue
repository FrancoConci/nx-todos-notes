<script setup lang="ts">
import { provide } from 'vue';
import { addResponseInterceptor, getAxiosInstance } from '@demo/axios-instance';
import { useAlertsStore } from '../../pinia/alerts/alerts';
const { addError } = useAlertsStore();
const axiosInstance = getAxiosInstance(import.meta.env.VITE_BASE_URL);
addResponseInterceptor(axiosInstance, addError);
provide('axiosInstance', axiosInstance);
</script>
<template>
  <slot></slot>
</template>
