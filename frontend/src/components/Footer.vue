<template>
  <v-footer class="bg-grey w-100">
    <v-row>
      <v-col>
        <v-row class="justify-center">
          <v-btn
            v-for="link in links"
            :key="link"
            variant="plain"
            style="margin: 10px"
            :id="link"
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
      links: ["Home", "Departments", "HRMS", "LMS", "LJPS", "Feedback"],
    };
  },
};
</script>
