<script setup lang="ts">
const { message, id, close } = defineProps<{
  message: string;
  id: string;
  close: () => void;
}>();
setTimeout(() => {
  close();
}, 2000);
</script>
<template>
  <div :class="$style.container" open>
    <div :class="$style.close">
      <button @click="close" :data-testid="`api-error-close-${id}`">x</button>
    </div>
    <h5 :class="$style.text" :data-testid="`api-error-text-${id}`">
      {{ message }}
    </h5>
  </div>
</template>
<style module>
@value centered from '../../../styles.css';

.container {
  composes: centered;
  background-color: var(--danger-main);
  width: clamp(240px, 40vw, 800px);
  max-height: 32px;
  border-radius: var(--spacing4);
  box-shadow: -2px 2px 5px black;
  text-align: center;
}

.close {
  align-self: left;
  margin: var(--spacing4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  color: var(--primary-main);
  flex: 1;
  max-width: clamp(200px, calc(40vw -40px), 760px);
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: var(--spacing4);
}
</style>
