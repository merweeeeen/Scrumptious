<template>
  <v-app-bar
    :elevation="2"
    scroll-behavior="hide"
    scroll-threshold="1000"
    color="teal-darken-4"
    :id="NavBar"
  >
    <!-- <v-app-bar-nav-icon :id="Menu"></v-app-bar-nav-icon> -->
    <v-btn icon @click="this.$router.push({ path: '/' })" id="Menu">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-app-bar-title :id="Title" @click="this.$router.push({ path: '/' })">
      SBRP
    </v-app-bar-title>

        <!-- <v-btn 
        variant="text"
        @click="this.$router.push({path: '/create'})" 
        :id="Link"
        > 
            link!
        </v-btn> -->

    <v-btn icon @click="this.$router.push({ path: '/profile' })" id="Account">
      <v-icon>mdi-account</v-icon>
    </v-btn>

        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        return {
            profile: (profile) => store.commit("profile", profile),
        };
    },
    data() {
        return {
            NavBar: "NavBar",
            Menu: "Menu",
            Title: "Title",
            Link: "Link",
            Account: "Account",
        };
    },
    methods: {
        async logout() {
            await this.$router.push({ path: "/login" });
            this.profile("");
            // console.log(this.$store.state.profile);
        },
    },
};
</script>
