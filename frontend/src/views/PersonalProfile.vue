<!-- Template -->
<template>
    <v-app>
      <!-- Nav Bar -->
      <!-- <NavBar id="NavBar"></NavBar>
   -->
      <!-- Start of Content -->
      <div class="d-flex justify-center">
        <div class="maxwidth">
          <v-container class="mt-16 align-start w-100">
            <!-- Profile Picture and Name -->
            <v-row class="ma-0 w-100 align-center justify-center">
                <v-col 
                    cols="auto"
                >
                    <v-sheet
                    >
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
                    </v-sheet>
                    <v-sheet class="text-center">
                        <h1>{{ staffInfo.staff_FName }} {{ staffInfo.staff_LName }}</h1>
                        <h3> Developer in IT Department</h3>
                        <h4> {{ staffInfo.email }}</h4>
                    </v-sheet>
                </v-col>
                
                <v-col 
                    cols="auto"
                >
                    <v-sheet>
                        <h3>Skills</h3>
                        <hr>
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
                    </v-sheet>
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
                        <p class="text-h5 text--primary" id="documents">
                          Documents
                        </p>
                      </v-col>

                      <v-col class="d-flex align-center py-0 h-100">
                        <!-- Edit documents button: for future development -->
                        <!-- <v-icon
                          class="align-center w-100 justify-end"
                          size="x-large"
                          @click="toggleSaved"
                          id="editBtn"
                        >
                          mdi-file-edit-outline
                        </v-icon> -->
                      </v-col>
                    </v-row>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-file-document-outline</v-icon>
                        Staff_Resume.pdf
                    </p>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-file-document-outline</v-icon>
                        Staff_Resume.pdf
                    </p>

                    <v-row class="d-flex align-center mt-1">
                      <v-col>
                        <p class="text-h5 text--primary" id="documents">
                          Staff Information
                        </p>
                      </v-col>

                      <!-- <v-col class="d-flex align-center py-0 h-100">
                      </v-col> -->
                    </v-row>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-earth</v-icon>
                        Country: {{ staffInfo.country }}
                    </p>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-account-tie</v-icon>
                        Staff ID: {{ staffInfo.staffid }}
                    </p>

                  </v-card-text>

                  <!-- <v-row class="" justify="space-between">
                    <v-col class="pt-0">
                      <v-card-text>
                        <p class="text-h7 text-medium-emphasis text--primary" id="updatedDate">
                          Last Updated: {{ pretty_date(created_at) }} 
                        </p>
                      </v-card-text>
                    </v-col>
                    <v-col cols="auto" class="me-4">
                    </v-col>
                  </v-row> -->
                </v-card>
              </v-col>
            </v-row>
  
            <!-- <v-row class="ma-0 w-100">
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
                    > 
                      {{ skill }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row> -->
          </v-container>
        </div>
      </div>
  
      <!-- Footer -->
      <!-- <Footer id="Footer"></Footer> -->
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
        employeeSkills: ["Python", "C++", "Java", "HTML", "CSS", "R", "Hello World", "Skill A"],
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
  .minWidth {
    min-width: 500px;
  }
  </style>
  