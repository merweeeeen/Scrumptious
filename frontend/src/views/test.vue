<template>
  Ding is so cool can do routing
  <v-btn v-if="this.$store.state.access === 'HR'" @click="gotoEvent"> Create </v-btn>
</template>

<script>
export default {
  name: "test",
  methods: {
    gotoEvent() {
      this.$router.push("/create");
    },
  },
  mounted() {
    console.log(this.$store.state.access);
    console.log(this.$store.state.skills);
  },
};
</script>
