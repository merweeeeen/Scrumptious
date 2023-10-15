<template>
  <v-app>
  <v-container class="mt-12 fill-height align-start">
    <v-row>
      <v-col class="v-col-4 mt-8 ">
        <Filter id="Filter"></Filter>
      </v-col>
      <v-col>
        <v-row class="flex-column mt-6">
          <v-col  v-for="listing in listings" :key="listing._listing_id">
            <ListingCard
              :roleName="listing._listing_name"
              :Department="listing._dept"
              :num_openings="listing._num_openings"
              :created_at="listing._created_date"
              :open="listing._open"
              :access=this.$store.state.access
              @click.native="gotoListing(listing)"
              :id="listing._listing_id"
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
                  console.log(this.listings)
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
            this.$router.push({ name: 'ListingPage', params: { listing_id: listing._listing_id } })
          }
      },
      mounted() {
          this.gotoLogin();
          this.getAllListings();
      },
  }
</script>
