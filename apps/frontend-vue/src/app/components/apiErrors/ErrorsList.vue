<script setup lang="ts">
import { computed } from 'vue';
import { useAlertsStore } from '../../../pinia/alerts/alerts';
import ErrorPopup from './ErrorContainer.vue';

const { errors, deleteError } = useAlertsStore();
const errorKeys = computed(() => Object.keys(errors));
</script>
<template>
  <section :class="$style.container">
    <ErrorPopup
      v-for="key in errorKeys"
      :message="errors[key]"
      :id="key"
      :close="() => deleteError(key)"
      :key="key"
      :data-testid="`api-error-popup-${key}`"
    />
  </section>
</template>
<style module>
@value centered from '../../../styles.css';

.container {
  composes: centered;
  position: fixed;
  bottom: 0px;
  left: 0px;
  flex-direction: column;
  width: 100vw;
}
</style>
