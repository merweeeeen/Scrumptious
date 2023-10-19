<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <v-app>
  <NavBar />
  <router-view />
  <Footer />
</v-app>
  <ListingPage />
</template>

