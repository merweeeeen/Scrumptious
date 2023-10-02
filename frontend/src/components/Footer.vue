<template>
    <v-footer class="bg-grey">
      <v-row>
        <v-col cols="3"> </v-col>
        <v-col cols="6">
          <v-row>
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
        <v-col> </v-col>
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