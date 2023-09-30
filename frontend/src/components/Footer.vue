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
        <!-- <v-row>
          <v-img
            :height="200"
            src="https://firebasestorage.googleapis.com/v0/b/scrumptious-861cd.appspot.com/o/logo2.png?alt=media&token=c0cc2721-7c53-4556-a6a4-997f9094150c"
          ></v-img>
        </v-row> -->
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-footer>
  <!-- <v-footer class="bg-grey-lighten-1">
    <v-row>
      <v-col>
        <div style="margin:20px">
          Departments
        </div> 
      </v-col>
      <v-col>
        <v-row>
          <v-img
            :height="200"
            src="https://firebasestorage.googleapis.com/v0/b/scrumptious-861cd.appspot.com/o/logo2.png?alt=media&token=c0cc2721-7c53-4556-a6a4-997f9094150c"
          ></v-img>
        </v-row>
        <v-row>
          
        </v-row>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-footer> -->
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
