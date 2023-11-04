<template>
  <div class="mt-12 fill-height align-start">
    <br>
    <h2 class="ml-4">Redirecting you to {{ link }}...</h2>
  </div>
</template>

<script>
export default {
  name: "Redirect",
  data() {
    return {
      link: this.$route.params.page
    };
  },
  mounted() {
    // location.reload();
    // this.$router.reload();
  },
};
</script>
