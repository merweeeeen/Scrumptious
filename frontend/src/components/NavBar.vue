<template>
    <v-app-bar :elevation="2"
    scroll-behavior="hide"
    scroll-threshold="1000"
    color="teal-darken-4"
    :id="NavBar">
        
        <v-app-bar-nav-icon :id="Menu"></v-app-bar-nav-icon>

        <v-app-bar-title :id="Title">
            SBRP
        </v-app-bar-title>

        <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

        <v-btn variant="text" :id="Link"> 
            <!--^ @click="this.$router.push({path: '/newpage'})"> -->
            <!-- Need to update router? -->
            link!
        </v-btn>

        <v-btn icon>
            <v-icon :id="Account">mdi-account</v-icon>
        </v-btn>

        <!-- <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            NavBar: "NavBar",
            Menu: "Menu",
            Title: "Title",
            Link: "Link",
            Account: "Account",
        };
    },
};
</script>