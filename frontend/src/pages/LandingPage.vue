<template>
  <v-app>
    <v-card> NAVBAR </v-card>
    <div style="margin-left: 10vw; margin-top: 5vh">
      <v-row>
        <v-col>
          <v-card style="width: 10vw; height: 20vw; margin: 10px"> </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row v-for="listing in listings" :key="listing.listing_id">
        <ListingCard style="margin: 10px" :listing="listing"> </ListingCard>
      </v-row>
    </div>
    <Footer id="Footer"></Footer>
  </v-app>
</template>

<script>
// import ListingCard from "../components/ListingCard.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    // ListingCard,
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
