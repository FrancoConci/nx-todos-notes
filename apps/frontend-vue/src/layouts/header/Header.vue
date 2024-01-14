<script setup></script>
<template>
  <header
    data-testid="header-container"
    class="flex flex-row w-full h-spacing-32"
  >
    <div
      data-testid="header-left"
      class="flex flex-row justify-center items-center h-spacing-32"
    >
      <slot name="leftToolbar">left toolbar</slot>
    </div>
    <div
      data-testid="header-main"
      class="flex flex-1 flex-row justify-center items-center h-spacing-32"
    >
      <slot>main toolbar</slot>
    </div>
    <div
      data-testid="header-right"
      class="flex flex-row justify-center items-center h-spacing-32"
    >
      <slot name="rightToolbar">right toolbar</slot>
    </div>
  </header>
</template>
