<!-- Template -->
<template>
    <v-app>
        <!-- Nav Bar -->
        <NavBar id="NavBar"></NavBar>

        <!-- Start of Content -->
        <div class="d-flex justify-center">
        <div class="maxwidth">
        <v-container class="mt-16 align-start w-100"> <!--fill-height-->
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
                                    <p class="text-h4 text--primary">
                                        {{listing.listing_name}}
                                    </p>
                                </v-col>

                                <v-col class="d-flex align-center py-0 h-100">
                                    <v-icon class="align-center w-100 justify-end"  
                                    size="x-large"
                                    @click="toggleSaved"
                                    v-if="saved"
                                    >
                                    mdi-heart
                                    </v-icon>
                                    <v-icon class="align-center w-100 justify-end"  
                                    size="x-large"
                                    @click="toggleSaved"
                                    v-else
                                    >
                                    mdi-heart-outline
                                    </v-icon>
                                </v-col>
                            </v-row>
                            <p class="text-h6 text--primary">
                                {{listing.dept}}
                            </p>
                            <p class="text-h7 text--primary">
                                {{listing.num_openings}} Openings | {{listing.open}} Applicant(s)
                            </p>
                            <p class="text-h7 text--primary">
                                Country: {{listing.country}}
                            </p>
                            <p class="text-h7 text--primary">
                                Closing on: {{listing.expiry_date}} 
                            </p>
                        </v-card-text>
                        <v-row class="" justify="space-between">
                            <v-col class="pt-0">
                                <v-card-text>
                                <p class="text-h7 text--primary">
                                    {{days_posted(listing.created_date)}} 
                                </p>
                                </v-card-text>
                            </v-col>
                            <v-col cols="auto" class="me-4">
                                <v-btn 
                                    density="comfortable"
                                    size="small"
                                    variant="flat"
                                    v-bind:color="primaryColor"
                                    id="apply"
                                >
                                    Apply
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card> 
<!-- 
                    <div class="text--primary">
                            well meaning and kindly.<br>
                            "a benevolent smile"
                    </div> -->

                </v-col>
            </v-row>

            <v-row class="ma-0 w-100">
                <v-col class="pb-0">
                    <v-card 
                        width="100%"
                        color="black" 
                        variant="outlined"
                    > 
                        <v-card-text>
                            <p class="text-h6 text--primary">
                                Job Description
                            </p>
                            <p class="text-h7 text--primary">
                                {{listing.description}} 
                            </p>
                            <br>
                            <p class="text-h6 text--primary">
                                Skills Required
                            </p>
                            <v-chip v-for="skill in listingSkills" class="ma-1"
                                    variant='tonal'
                                    :color="employeeSkills.includes(skill) ? 'green-darken-3' : 'default'"
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
    
        <!-- Footer -->
        <Footer id="Footer"></Footer>
    </v-app>
  </template>

<!-- Script -->
<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios'
import { useStore } from "vuex";


export default {

    setup() {
        const store = useStore();
        return {
        access: (access) => store.commit("access", access),
        skills: (skills) => store.commit("skills", skills),
        };
    },

    components: {
        NavBar,
        Footer,
    },  

    data() {
        return {
        listing: {},
        listing_id: this.$route.params.listing_id,
        listingSkills: [],
        primaryColor: "black",
        employeeSkills: [],
        savedListings: ["12", "13", "14"],
        saved: false,
        staffid: "",
        };
    },

    methods: {
        async getListing() {
            axios.get('http://localhost:3003/listing/' + this.listing_id )
            .then(response => {
                var data = response.data.body
                // console.log(data)
                this.listing = data[0]
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getRoleSkills() { // not sure why but the rolename endpoint not really working out
            axios.get('http://localhost:3003/rs/')
            .then(response => {
                var data = response.data.body
                // console.log(data)
                var requiredSkills = []
                
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].role_name)
                    if (data[i].role_name == this.listing.role_name) {
                        requiredSkills.push(data[i].skill_name)
                    }
                }
                this.listingSkills = requiredSkills
                // console.log(this.listingSkills)
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getEmployeeSkills() {
            this.employeeSkills = this.$store.state.skills
            this.staffid = this.$store.state.staff
            // console.log(this.staffid);
        },

        days_posted(created_at) {
            var today = new Date();
            var created = new Date(created_at);
            var diff = today - created;
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (days == 1) {
                return "Posted " + days + " day ago";
            }
            else if (days == 0) {
                return "Posted today";
            }
            else {
            return "Posted " + days + " days ago";
            }
        },

        // getFavouriteListings() {
        //     axios.get('http://localhost:3003/favourite/read/'+ this.staffid +'/' + this.listing_id)
        //     .then(response => {
        //         const favouriteClass = response.data.body
        //         console.log(favouriteClass)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // },

        getSaved() {
            axios.get('http://localhost:3003/favourite/read/'+ this.staffid +'/' + this.listing_id)
            .then(response => {
                const favouriteClass = response.data.body
                console.log(favouriteClass)
                if (favouriteClass) {
                this.saved = true
                console.log("at first listing saved: " + this.saved)
                }
                else {
                    this.saved = false
                    console.log("at first listing saved: " + this.saved)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },

        toggleSaved() {
            // this.saved = !this.saved
            if (!this.saved) {
                axios.post('http://localhost:3003/favourite/add', 
                {
                    staffid: this.staffid,
                    listingid: this.listing_id
                }
                )
                .then(response => {
                    const favouriteClass = response
                    console.log(favouriteClass)
                    this.saved = favouriteClass
                })
                .catch(error => {
                    console.log(error)
                })
            }
            else {
                axios.post('http://localhost:3003/favourite/remove', {
                    staffid: this.staffid,
                    listingid: this.listing_id
                })
                .then(response => {
                    this.saved = false
                    console.log(response)
                }
                )
                .catch(
                    console.log("error")
                )
                // console.log(this.savedListings)
            }
        }
            
    },

    created() {
        this.getListing(),
        this.getRoleSkills(),
        this.getEmployeeSkills(),
        this.getSaved()
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