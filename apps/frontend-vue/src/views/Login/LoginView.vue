<script setup lang="ts">
import Footer from '../../layouts/footer/Footer.vue';
import Header from '../../layouts/header/Header.vue';
import Page from '../../layouts/page/Page.vue';
import LoginForm from './LoginForm.vue';
import ThemeButton from '../../app/components/themeButton/ThemeButton.vue';
</script>
<template>
  <Page>
    <template #header
      ><Header>
        <template #rightToolbar><ThemeButton /></template> </Header
    ></template>
    <LoginForm />
    <template #footer><Footer></Footer></template>
  </Page>
</template>
