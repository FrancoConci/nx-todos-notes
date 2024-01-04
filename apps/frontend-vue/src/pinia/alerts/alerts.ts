import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertsStore = defineStore('alerts', () => {
  const errors = ref<Record<string, string>>({});
  const addError = (id: string, message: string) => {
    errors.value[id] = message;
  };
  const deleteError = (id: string) => {
    delete errors.value[id];
  };

  return { errors, addError, deleteError };
});
