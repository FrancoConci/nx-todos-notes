<script setup lang="ts"></script>
<template>
  <div
    data-testid="page-container"
    class="flex flex-1 flex-col max-h-screen w-full align-middle justify-center"
  >
    <header
      data-testid="page-header"
      class="flex-row align-middle justify-center w-full h-spacing-32"
    >
      <slot name="header">header</slot>
    </header>
    <main
      data-testid="page-main"
      class="flex flex-1 flex-col align-middle justify-center h-full"
    >
      <slot>content</slot>
    </main>
    <footer
      data-testid="page-footer"
      class="flex-row align-middle justify-center h-spacing-32"
    >
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>
