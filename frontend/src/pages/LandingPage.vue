<template>
  <v-app>
    <Footer id="Footer"></Footer>
    <ListingCard id="ListingCard"></ListingCard>
  </v-app>
</template>

<script>
// import ListingCard from "../components/ListingCard.vue";
import Footer from "../components/Footer.vue";
import ListingCard from "../components/Listing.vue";

export default {
  components: {
    ListingCard,
    Footer,
  },
  data() {
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
