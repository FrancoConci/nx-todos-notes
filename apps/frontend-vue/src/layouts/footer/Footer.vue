<script setup></script>
<template>
  <div data-testid="footer" :class="$style.footer"><slot>footer</slot></div>
</template>
<style module>
@value centered from '../styling/base.css';

.footer {
  composes: centered;
  max-height: 32px;
  width: 100%;
  justify-content: space-evenly;
  padding: 0px var(--spacing16);
}
</style>
