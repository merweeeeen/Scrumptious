<template>
  <v-app>
    <v-container class="mt-12 fill-height align-start">
      <v-row>
        <v-col class="v-col-4 mt-8">
          <Filter
            id="Filter"
            :skills="skills"
            :roles="roles"
            :depts="depts"
            @searchListing="searchListing"
            @searchStaff="searchStaff"
            @filter="filterFunction"
            @reset="reset"
          ></Filter>
        </v-col>
        <v-col>
          <v-row class="flex-column mt-6">
            <v-col
              v-for="listing in listings"
              :key="listing._listing_id"
              :id="listing._listing_name"
            >
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
                :skills="listing._skills"
              ></ListingCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ListingCard from "../components/Listing.vue";
import axios from "axios";
import Filter from "../components/Filter.vue";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "LandingPage",
  components: {
    ListingCard,
    Filter,
    NavBar,
    Footer,
  },
  data() {
    return {
      listings: [],
      skills: [
        "Accounting Skills",
        "Microsoft Excel",
        "Presentation Skills",
        "Adaptability",
        "Python",
        "Computational Problem Solving",
        "JavaScript",
        "UI/UX skill",
      ],
      roles: ["Software Developer", "Accountant", "Customer Service"],
      depts: [
        "Cyber",
        "Human Resource",
        "Customer Service",
        "Marketing",
        "Sales",
        "Research and Development",
        "IT Support",
        "Management",
      ],
    };
  },
  methods: {
    gotoEvent() {
      this.$router.push("/create");
    },
    async getAllListings() {
      const response = await axios.get("http://localhost:3003/listing");
      if (this.$store.state.profile._Access_Rights === "0") {
        this.listings = response.data.body.filter(
          (listing) =>
            listing._open === 1 && Date.parse(listing._expiry_date) >= Date.now()
        );
      } else {
        this.listings = response.data.body;
      }
    },
    gotoLogin() {
      if (this.$store.state.profile === "") {
        this.$router.push("/login");
      }
    },
    async searchStaff(staffName) {
      if (staffName === "") {
        await this.getAllListings();
        return;
      }
      const response = await axios.get(
        `http://localhost:3003/staff/${staffName}`
      );
      this.listings = response.data.body;
    },
    async searchListing(listing_name) {
      if (listing_name === "") {
        await this.getAllListings();
        return;
      }
      const response = await axios.get(
        `http://localhost:3003/search/${listing_name}`
      );
      this.listings = response.data.body.filter(
        (listing) => listing._open === 1
      );
    },
    async filterFunction(filters) {
      // this.$router.push(
      //   `/${filters.skill}/${filters.vacancy}/${filters.dept}/${filters.role}`
      // );
      const filterKeys = Object.keys(filters);
      let queryFilter = {};
      for (let filter of filterKeys) {
        if (filters[filter] !== null) {
          queryFilter[filter] = filters[filter];
        }
      }
      const value = await this.getFilteredListings(queryFilter);
      return value;
    },
    async getFilteredListings(filter) {
      const response = await axios.get(
        `http://localhost:3003/listing/filter/${JSON.stringify(filter)}`
      );
      this.listings = response.data.body;
      return response.data.body;
    },
    async reset() {
      await this.getAllListings();
    },
    gotoListing(listing) {
      // this.$router.push('/' + listing.id)
      this.$router.push({
        name: "ListingPage",
        params: { listing_id: listing._listing_id },
      });
    },
  },
  async created() {
    this.gotoLogin();
    await this.getAllListings();
    await this.$nextTick();
  },
};
</script>
