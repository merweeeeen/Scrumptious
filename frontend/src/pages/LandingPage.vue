<template>
    <v-app>
    <v-container class="mt-12 fill-height align-start">
      <NavBar></NavBar>
      <v-row>
        <v-col class="v-col-4 mt-8 ">
          <Filter id="Filter"></Filter>
        </v-col>
        <v-col>
          <v-row class="flex-column mt-6">
            <v-col  v-for="listing in listings" :key="listing.listing_id">
              <ListingCard
                :roleName="listing.listing_name"
                :roleInfo="listing.info"
              ></ListingCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
    </v-container>
    <Footer></Footer>
    </v-app>
</template>

<script>
import ListingCard from "../components/Listing.vue";
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
      listings: [
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          country: "Singapore",
          info: {
            "Department": "Information Technology",
            "Openings": "2",
            "Applicants": "4",
            "Closing in": "11 Days",
            "Full Time": "Full Time",
            "Skills_Required":["Python", "HTML", "Javascript", "C++"]
          },
        },
        {
          listing_id: 1111,
          listing_name: "Data Engineer",
          info: {
            "Department": "Information Technology",
            "Openings": "3",
            "Applicants": "3",
            "Closing in": "4 Days",
            "Full Time": "Part Time",
            "Skills_Required":["Python", "HTML", "Javascript", "C++"]
          },
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Janitor",
          info: {
            "Department": "Human Resource",
            "Openings": "1",
            "Applicants": "0",
            "Closing in": "13 Days",
            "Full Time": "Part Time",
            "Skills_Required":["Python", "HTML", "Javascript", "C++"]
          },
          country: "Singapore",
        },
      ],
    };
  },
};
</script>

<style></style>
