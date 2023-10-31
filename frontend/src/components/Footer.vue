<template>
  <v-footer color="teal-darken-4" class="w-100">
    <v-row>
      <v-col>
        <v-row class="justify-center">
          <v-btn
            v-for="link in links"
            :key="link"
            variant="plain"
            style="margin: 10px"
            :id="link"
            @click="gotoWhere(link)"
          >
            {{ link }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      links: ["Home", "HRMS", "LMS", "LJPS"],
    };
  },
  methods: {
    gotoWhere(link) {
      if (link == "Home"){
        this.$router.push({ path: "/" });
      }
      else{
        this.$router.push({ name:"Redirect", params: { page: link }});
      }
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  },
};
</script>
