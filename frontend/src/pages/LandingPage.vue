<template>
  <v-app>
    <NavBar id="NavBar"></NavBar>
    <Footer id="Footer"></Footer>
    <ListingCard id="ListingCard"></ListingCard>
  </v-app>
</template>

<script>
// import ListingCard from "../components/ListingCard.vue";
import NavBar from "../components/NavBar.vue";
import ListingCard from "../components/Listing.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    ListingCard,
    NavBar,
    Footer,
  },  data() {
    return {
      listings: [
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
        {
          listing_id: 1234,
          listing_name: "Software Engineer",
          dept: "Tech",
          country: "Singapore",
        },
      ],
    };
  },
};
</script>

<style></style>
