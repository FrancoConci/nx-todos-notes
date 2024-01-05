<script setup lang="ts">
import Footer from '../../layouts/footer/Footer.vue';
import Header from '../../layouts/header/Header.vue';
import Page from '../../layouts/page/Page.vue';
import LoginForm from './LoginForm.vue';
</script>
<template>
  <Page>
    <template #header><Header></Header></template>
    <LoginForm />
    <template #footer><Footer></Footer></template>
  </Page>
</template>
