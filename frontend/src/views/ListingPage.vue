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

                    <v-col
                      class="d-flex align-center py-0 h-100"
                      v-if="this.$store.state.profile._Access_Rights == 0"
                    >
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
                    {{ applicants.length }} Applicant(s)
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
                      v-if=getRole()
                    >
                      Apply
                    </v-btn> -->

                    <ApplyRLPopup
                      :roleName="listing._listing_name"
                      :roleId="listing_id"
                      id="ApplyRLPopup"
                      v-if="getRole()"
                    />

                    <v-btn
                      density="comfortable"
                      size="small"
                      variant="flat"
                      v-bind:color="primaryColor"
                      id="update"
                      class="mr-5"
                      v-else
                      @click="
                        this.$router.push({
                          name: 'UpdatePage',
                          params: { listing_id: listing_id },
                        })
                      "
                    >
                      Update
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
                    {{ listing._desc }}
                  </p>
                  <br />
                  <p class="text-h6 text--primary">Skills Required</p>
                  <div v-if="getRole()">
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
                  </div>
                  <div v-else>
                    <v-chip
                      v-for="skill in listingSkills"
                      class="ma-1"
                      variant="tonal"
                      :id="skill"
                    >
                      {{ skill }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="ma-0 w-100" v-if="getRole() === false">
            <v-col class="pb-0">
              <p class="text-h6 text--primary">Applicants</p>
            </v-col>
          </v-row>

          <div v-if="getRole() === false && applicants.length != 0">
            <v-row
              class="ma-0 w-100"
              v-for="applicant in applicants"
              :id="applicant._Staff_id"
            >
              <v-col class="pb-0">
                <v-card width="100%" color="black" variant="outlined" @click.native="gotoProfile(applicant._Staff_id)" id="click">
                  <v-card-text>
                    <p class="text-h5 text--primary" id="staffName">
                      <em
                        >{{ applicant._Staff_FName }}
                        {{ applicant._Staff_LName }}</em
                      >
                    </p>
                    <p class="text-h7 text--primary" id="staffIdAndEmail">
                      <!-- {{ listing._desc }} -->
                      Staff ID: {{ applicant._Staff_id }}
                      <br />
                      Email: {{ applicant._Email }}
                    </p>
                    <!-- <br /> -->
                    <p class="text-h7 text--primary">
                      <b>Applicant's Skills:</b>
                    </p>
                    <v-chip
                      v-for="skill in applicant._Skills"
                      class="ma-1"
                      variant="tonal"
                      :color="
                        listingSkills.includes(skill)
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
          </div>
          <v-row v-else-if="getRole() === false && applicants.length == 0">
            <v-col
              style="
                background-color: rgb(241, 249, 241);
                border-radius: 10px;
                margin: 0px 20px;
              "
              ><p style="margin-left: 10px">
                <em style="colour: rgb(174, 174, 174)">No Applicants Yet.</em>
              </p></v-col
            >
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
import ApplyRLPopup from "../components/ApplyRLPopup.vue";

export default {
  components: {
    NavBar,
    Footer,
    ApplyRLPopup,
  },

  data() {
    return {
      listing: "",
      listing_id: parseInt(this.$route.params.listing_id),
      listingSkills: [],
      primaryColor: "black",
      employeeSkills: this.$store.state.profile._Skills,
      saved: false,
      staffid: this.$store.state.profile._Staff_id,
      profile: this.$store.state.profile,
      applicants: [], //list of users who applied
    };
  },

  methods: {
    // async getApplicant() {
    //   const response = await axios.get(
    //     `http://localhost:3003/staff/${this.$store.state.profile._Staff_id}`
    //   );
    //   this.applicant = response.data.body;
    // },

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

    async getRelevantApplicants() {
      const response = await axios.get(
        `http://localhost:3003/application/getappstaff/${this.listing_id}`
      );
      this.applicants = response.data.body;
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
      } else {
        this.saved = false;
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
          })
          .catch(console.log("error"));
      }
    },
    getRole() {
      if (this.$store.state.profile._Access_Rights === "1") {
        //this is HR

        return false;
      }
      return true;
    },
    gotoProfile(staffId) {
      // this.$router.push('/' + listing.id)
      this.$router.push({
        name: "StaffProfilePage",
        params: { staff_id: staffId },
      });
    },
  },

  async mounted() {
    await this.getListing();
    await this.getRoleSkills();
    await this.getSaved();
    await this.getRelevantApplicants();
    console.log(this.getRole());
    // await this.getApplicant();
    // this.getFavouriteListings()
    // console.log(this.applicant)
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
