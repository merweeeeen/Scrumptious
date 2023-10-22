<!-- Template -->
<template>
  <v-app>
    <!-- Start of Content -->
    <div class="d-flex justify-center">
      <div class="maxwidth">
        <v-container class="mt-16 align-start w-100">
          <!--fill-height-->
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
                      <p class="text-h4 text--primary" id="listingName">
                        {{ listing._listing_name }}
                      </p>
                    </v-col>

                    <v-col class="d-flex align-center py-0 h-100">
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
                    </v-col>
                  </v-row>
                  <p class="text-h6 text--primary" id="roleNameAndDepartment">
                    {{ listing._role_name }} in {{ listing._dept }}
                  </p>
                  <p class="text-h7 text--primary" id="vacancyAndApplicants">
                    {{ listing._num_openings }} Openings |
                    {{ listing._applicants }} Applicant(s)
                  </p>
                  <p class="text-h7 text--primary" id="country">
                    Country: {{ listing._country }}
                  </p>
                  <p class="text-h7 text--primary" id="expiryDate">
                    Closing on: {{ listing._expiry_date }}
                  </p>
                </v-card-text>
                <v-row class="" justify="space-between">
                  <v-col class="pt-0">
                    <v-card-text>
                      <p class="text-h7 text--primary" id="createdDate">
                        {{ days_posted(listing._created_date) }} on
                        {{ pretty_date(listing._created_date) }}
                      </p>
                    </v-card-text>
                  </v-col>
                  <v-col cols="auto" class="me-4">
                    <!-- <v-btn
                      density="comfortable"
                      size="small"
                      variant="flat"
                      v-bind:color="primaryColor"
                      id="applyBtn"
                    >
                      Apply
                    </v-btn> -->
                    <ApplyRLPopup
                    :roleName="this.roleName"
                    :roleId="this.listing_id"
                    id="ApplyRLPopup"
                    />
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
                    {{ listing._desc }}
                  </p>
                  <br />
                  <p class="text-h6 text--primary">Skills Required</p>
                  <v-chip
                    v-for="skill in listingSkills"
                    class="ma-1"
                    variant="tonal"
                    :color="
                      employeeSkills.includes(skill)
                        ? 'green-darken-3'
                        : 'default'
                    "
                    :id="skill"
                  >
                    {{ skill }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<!-- Script -->
<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import ApplyRLPopup from '../components/ApplyRLPopup.vue';

export default {
  components: {
    NavBar,
    Footer,
    ApplyRLPopup,
  },

  data() {
    return {
      listing: "",
      listing_id: this.$route.params.listing_id,
      listingSkills: [],
      primaryColor: "black",
      employeeSkills: this.$store.state.profile._Skills,
      savedListings: ["12", "13", "14"],
      saved: false,
      staffid: this.$store.state.profile._Staff_id,
    };
  },

  methods: {
    async getListing() {
      const response = await axios.get(
        `http://localhost:3003/listing/${this.listing_id}`
      );
      this.listing = response.data.body;
    },

    async getRoleSkills() {
      // not sure why but the rolename endpoint not really working out
      axios
        .get(`http://localhost:3003/rs/${this.listing._role_name}`)
        .then((response) => {
          const data = response.data.body;
          let requiredSkills = [];

          for (let i of data) {
            // console.log(data[i].role_name)
            requiredSkills.push(i.skill_name);
          }
          this.listingSkills = requiredSkills;
        })
        .catch((error) => {
          console.log(error);
        });
    },

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

    async getSaved() {
      // console.log("staffid", this.staffid);
      const response = await axios.get(
        `http://localhost:3003/favourite/read/${this.staffid}/${this.listing_id}`
      );
      // console.log("saved", response)
      const favouriteClass = response.data?.body
        ? response.data.body
        : undefined;
      if (favouriteClass) {
        this.saved = true;
        console.log("at first listing saved: " + this.saved);
      } else {
        this.saved = false;
        console.log("at first listing saved: " + this.saved);
      }
    },

    toggleSaved() {
      // this.saved = !this.saved
      if (!this.saved) {
        axios
          .post("http://localhost:3003/favourite/add", {
            staffid: this.staffid,
            listingid: this.listing_id,
          })
          .then((response) => {
            const favouriteClass = response;
            this.saved = favouriteClass;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:3003/favourite/remove", {
            staffid: this.staffid,
            listingid: this.listing_id,
          })
          .then((response) => {
            this.saved = false;
            console.log(response);
          })
          .catch(console.log("error"));
        // console.log(this.savedListings)
      }
    },
  },

  async mounted() {
    await this.getListing();
    await this.getRoleSkills();
    await this.getSaved();
    // this.getFavouriteListings()
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
