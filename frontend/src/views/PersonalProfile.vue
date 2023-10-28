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
                    <v-sheet class="text-center" >
                        <h1 id="staffName">{{ staffInfo._Staff_FName }} {{ staffInfo._Staff_LName }}</h1>
                        <h3 id="roleAndDept">{{ staffInfo._Role_Name }} in {{staffInfo._Dept}} Department</h3> <!--STAFF_ROLE in -->
                        <h4 id="email"> {{ staffInfo._Email }}</h4>
                    </v-sheet>
                </v-col>
            </v-row>

            <!-- Staff Information -->
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
                    <!-- <v-row class="d-flex align-center">
                      <v-col>
                        <p class="text-h5 text--primary" id="documents">
                          Documents
                        </p>
                      </v-col>

                      <v-col class="d-flex align-center py-0 h-100"> -->
                        <!-- Edit documents button: for future development -->
                        <!-- <v-icon
                          class="align-center w-100 justify-end"
                          size="x-large"
                          @click="toggleSaved"
                          id="editBtn"
                        >
                          mdi-file-edit-outline
                        </v-icon> -->
                      <!-- </v-col>
                    </v-row>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-file-document-outline</v-icon>
                        Staff_Resume.pdf
                    </p>
                    <p class="text--primary my-1" id="roleNameAndDepartment">
                        <v-icon  id="editBtn">mdi-file-document-outline</v-icon>
                        Staff_Resume.pdf
                    </p> -->

                    <v-row class="d-flex align-center "> <!--mt-1-->
                      <v-col>
                        <p class="text-h5 text--primary" id="documents">
                          My Information
                        </p>
                      </v-col>
                    </v-row>
                    <p class="text--primary my-1" >
                        <v-icon>mdi-earth</v-icon>
                        <p style="display:inline" id="country"> Country: {{ staffInfo._Country }}</p>
                    </p>
                    <p class="text--primary my-1">
                        <v-icon>mdi-account-tie</v-icon>
                        <p style="display:inline" id="staffId"> Staff ID: {{ staffInfo._Staff_id }}</p>
                    </p>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
  
            <!-- Skills -->
            <v-row>    
                <v-col 
                    cols="12"
                >
                    <v-sheet>
                        <h3>Skills</h3>
                        <hr>
                        <v-chip
                        v-for="skill in staffInfo._Skills"
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


            <!-- Past Applied Listings -->
            <v-row>    
                <v-col 
                    cols="12"
                >
                    <v-sheet>
                        <h3>Past Applications</h3>
                        <hr>
                        <v-col
                        cols="12"
                        v-for="listing in appliedListings"
                        class="ma-1"
                        variant="tonal"
                        
                        :id="listing._listing_id"
                        > <!--:color="
                            employeeSkills.includes(skill)
                            ? 'green-darken-3'
                            : 'default'
                        "-->
                        <ListingCard
                          :roleName="listing._listing_name"
                          :roleId="listing._listing_id"
                          :Department="listing._dept"
                          :num_openings="listing._num_openings"
                          :created_at="listing._created_date"
                          :open="listing._open"
                          :access="this.$store.state._access_rights"
                          :expiry_date="listing._expiry_date"
                          :identified="listing._listing_name"
                          @click.native="gotoListing(listing)"
                          :id="listing._listing_id"
                        ></ListingCard>
                        </v-col>
                    </v-sheet>
                </v-col>
            </v-row>


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
  import ListingCard from "../components/Listing.vue";
  import { useStore } from "vuex";
  import axios from "axios";
  
  export default {
    setup() {
        const store = useStore();
    },

    components: {
      NavBar,
      Footer,
      ListingCard,
    },
  
    data() {
      return {
        primaryColor: "black",
        staffInfo: this.$store.state.profile,
        appliedListings: [],
      }; 
    },
  
    methods: {
  
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

      async getAppliedListings() {

        const response = await axios.get(
          `http://localhost:3003/application/staff/${this.staffInfo._Staff_id}`
        );
        this.appliedListings = response.data.body
      },

      gotoListing(listing) {
      // this.$router.push('/' + listing.id)
      this.$router.push({
        name: "ListingPage",
        params: { listing_id: listing._listing_id },
      });
    },
  
    },

    async mounted() {
        await this.getAppliedListings();
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
  