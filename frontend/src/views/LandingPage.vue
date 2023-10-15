<template>
  <v-app>
  <v-container class="mt-12 fill-height align-start">
    <v-row>
      <v-col class="v-col-4 mt-8 ">
        <Filter id="Filter"></Filter>
      </v-col>
      <v-col>
        <v-row class="flex-column mt-6">
          <v-col  v-for="listing in listings" :key="listing.listing_id">
            <ListingCard
              :roleName="listing.listing_name"
              :Department="listing.dept"
              :num_openings="listing.num_openings"
              :created_at="listing.created_date"
              :open="listing.open"
              :access=this.$store.state.access
              @click.native="gotoListing(listing)"
              :id="listing.listing_id"
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
  }
  },
      methods: {
          gotoEvent() {
              this.$router.push('/create')
          },
          async getAllListings() {
              axios.get("http://localhost:3003/listing")
              .then((response) => {
                  this.listings = response.data.body;
              })
          },
          gotoLogin() {
            console.log(this.$store.state.profile)
            if (this.$store.state.profile === "") {
              this.$router.push('/login')
            }
          },
          gotoListing(listing) {
            // this.$router.push('/' + listing.id)
            this.$router.push({ name: 'ListingPage', params: { listing_id: listing.listing_id } })
          }
      },
      mounted() {
          this.gotoLogin();
          this.getAllListings();
      },
  }
</script>
