<script setup lang="ts"></script>
<template>
  <div data-testid="page-container" :class="$style.container">
    <header data-testid="page-header" :class="$style.header">
      <slot name="header">header</slot>
    </header>
    <main data-testid="page-main" :class="$style.main">
      <slot>content</slot>
    </main>
    <footer data-testid="page-footer" :class="$style.footer">
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>

<style module>
@value centered from '../../styles.css';

.container {
  composes: centered;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}

.header {
  composes: centered;
  max-height: 32px;
  width: 100%;
}
.main {
  composes: centered;
  width: 100%;
}
.footer {
  composes: centered;
  max-height: 32px;
  width: 100%;
}
</style>
