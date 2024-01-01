<script setup></script>
<template>
  <header data-testid="header-container" :class="$style.centered">
    <div data-testid="header-left" :class="$style.toolbar">
      <slot name="leftToolbar">left toolbar</slot>
    </div>
    <div data-testid="header-main" :class="$style.main">
      <slot>main toolbar</slot>
    </div>
    <div data-testid="header-right" :class="$style.toolbar">
      <slot name="rightToolbar">right toolbar</slot>
    </div>
  </header>
</template>
<style module>
@value centered from '../../styles.css';
.header {
  composes: centered;
  max-height: 32px;
  width: 100%;
}

.toolbar {
  composes: centered;
  max-height: 32px;
  width: 264px;
  flex: unset;
  padding: 0px var(--spacing16);
  outline: solid 1px red;
}
.main {
  composes: toolbar;
  flex: 1;
}
</style>
