<!-- Template -->
<template>
    <v-app>
      <!-- Nav Bar -->
      <NavBar id="NavBar"></NavBar>
  
      <!-- Start of Content -->
      <div class="d-flex justify-center">
        <div class="maxwidth">
          <v-container class="mt-16 align-start w-100">
            <!-- Profile Picture and Name -->
            <v-row class="ma-0 w-100 align-center">
                <v-col class="col-auto">
                    <v-row class="py-2">
                        <v-col class="col-auto">
                            <v-img v-if="staffImg"
                            class="mx-auto rounded-circle"
                            width="200"
                            height="200"
                            :src="staffImg"
                            ></v-img>
                            <v-img v-else
                            class="mx-auto rounded-circle"
                            width="200"
                            height="200"
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            ></v-img>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center"> 
                        <v-col class="col-auto pa-0">
                            <h1>{{ staffInfo.staff_FName }} {{ staffInfo.staff_LName }}</h1>
                        </v-col>
                    </v-row>
                    <v-row class="p-0">
                        <v-col class="col-auto pa-0">
                            <h3> Developer in IT Department</h3>
                        </v-col>
                    </v-row>
                </v-col>
                
                <v-col class="col-8">

                </v-col>
            </v-row>

            <v-row class="ma-0 w-100">
              <v-col class="py-0">
                <!-- Top card with Role Information and Apply Button -->
                <v-card
                  width="100%"
                  v-bind:color="primaryColor"
                  variant="tonal"
                  margin="10px"
                >
                  <v-card-text>
                    <v-row class="d-flex align-center">
                      <v-col>
                        <!-- <p class="text-h4 text--primary" id="listingName">
                          {{ staffInfo.staff_FName }} {{ staffInfo.staff_LName }}
                        </p> -->
                      </v-col>
  
                      <!-- <v-col class="d-flex align-center py-0 h-100">
                        <v-icon
                          class="align-center w-100 justify-end"
                          size="x-large"
                          @click="toggleSaved"
                          v-if="saved"
                          id="saved"
                        >
                          mdi-heart
                        </v-icon>
                        <v-icon
                          class="align-center w-100 justify-end"
                          size="x-large"
                          @click="toggleSaved"
                          v-else
                          id="notSaved"
                        >
                          mdi-heart-outline
                        </v-icon>
                      </v-col> -->
                    </v-row>
                    <p class="text-h6 text--primary" id="roleNameAndDepartment">
                      {{ staffInfo.dept }} 
                    </p>
                    <p class="text-h7 text--primary" id="vacancyAndApplicants">
                        {{ staffInfo.email }}
                    </p>
                    <p class="text-h7 text--primary" id="country">
                      Country: {{ staffInfo.country }}
                    </p>
                    <p class="text-h7 text--primary" id="expiryDate">
                      Nothing for Now
                    </p>
                  </v-card-text>
                  <v-row class="" justify="space-between">
                    <v-col class="pt-0">
                      <v-card-text>
                        <p class="text-h7 text--primary" id="createdDate">
                          Nothing 
                        </p>
                      </v-card-text>
                    </v-col>
                    <v-col cols="auto" class="me-4">
                      <v-btn
                        density="comfortable"
                        size="small"
                        variant="flat"
                        v-bind:color="primaryColor"
                        id="applyBtn"
                      >
                        Apply
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
  
            <v-row class="ma-0 w-100">
              <v-col class="pb-0">
                <v-card width="100%" color="black" variant="outlined">
                  <v-card-text>
                    <p class="text-h6 text--primary">Job Description</p>
                    <p class="text-h7 text--primary" id="desc">
                      {{ staffInfo.email }}
                    </p>
                    <br />
                    <p class="text-h6 text--primary">Skills Required</p>
                    <v-chip
                      v-for="skill in employeeSkills"
                      class="ma-1"
                      variant="tonal"
                      
                      :id="skill"
                    > <!--:color="
                        employeeSkills.includes(skill)
                          ? 'green-darken-3'
                          : 'default'
                      "-->
                      {{ skill }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
  
      <!-- Footer -->
      <Footer id="Footer"></Footer>
    </v-app>
  </template>
  
  <!-- Script -->
  <script>
  import NavBar from "../components/NavBar.vue";
  import Footer from "../components/Footer.vue";
//   import axios from "axios";
  
  export default {
    components: {
      NavBar,
      Footer,
    },
  
    data() {
      return {
        primaryColor: "black",
        // employeeSkills: this.$store.state.profile._Skills,
        employeeSkills: ["Python", "C++"],
        savedListings: ["12", "13", "14"],
        saved: false,
        // staffid: this.$store.state.profile._Staff_id,
        staffid: "1001",
        staffInfo: {
            staffid: "1001",
            staff_FName: "Staff", 
            staff_LName: "Staff", 
            dept: "Human Resource",
            country: "SG",
            email: "staff@gmail.com",
        },
        staffImg: null, // "https://cdn.vuetifyjs.com/images/john.jpg"
      }; 
    },
  
    methods: {
    //   async getListing() {
    //     const response = await axios.get(
    //       `http://localhost:3003/listing/${this.listing_id}`
    //     );
    //     this.listing = response.data.body;
    //     console.log(this.listing);
    //   },
  
    //   async getRoleSkills() {
    //     axios
    //       .get(`http://localhost:3003/rs/${this.listing._role_name}`)
    //       .then((response) => {
    //         const data = response.data.body;
    //         console.log(data);
    //         let requiredSkills = [];
  
    //         for (let i of data) {
    //           // console.log(data[i].role_name)
    //           requiredSkills.push(i.skill_name);
    //         }
    //         console.log(requiredSkills)
    //         this.listingSkills = requiredSkills;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   },
  
      days_posted(created_at) {
        var today = new Date();
        var created = new Date(created_at);
        var diff = today - created;
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days == 1) {
          return "Posted " + days + " day ago";
        } else if (days == 0) {
          return "Posted today";
        } else {
          return "Posted " + days + " days ago";
        }
      },
  
      pretty_date(created_at) {
        var created = new Date(created_at);
        return created.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
  
    //   async getSaved() {
    //     // console.log("staffid", this.staffid);
    //     const response = await axios.get(
    //       `http://localhost:3003/favourite/read/${this.staffid}/${this.listing_id}`
    //     );
    //     // console.log("saved", response)
    //     const favouriteClass = response.data?.body
    //       ? response.data.body
    //       : undefined;
    //     console.log(favouriteClass);
    //     if (favouriteClass) {
    //       this.saved = true;
    //       console.log("at first listing saved: " + this.saved);
    //     } else {
    //       this.saved = false;
    //       console.log("at first listing saved: " + this.saved);
    //     }
    //   },
  
    },
  
    async mounted() {
    //   await this.getListing();
    //   await this.getRoleSkills();
    //   await this.getSaved();
    },
  };
  </script>
  
  <!-- Style -->
  <style scoped>
  .maxwidth {
    width: 100%;
    max-width: 800px;
  }
  </style>
  