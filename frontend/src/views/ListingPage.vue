<!-- Template -->
<template>
    <v-app>
        <!-- Nav Bar -->
        <NavBar id="NavBar"></NavBar>

        <!-- Start of Content -->
        <v-container class="mt-16 align-start"> <!--fill-height-->
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
                            <p class="text-h4 text--primary">
                                {{listing.listing_name}}
                            </p>
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
                                    Posted 4 Days Ago 
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
                                Skillset Required
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
    
        <!-- Footer -->
        <Footer id="Footer"></Footer>
    </v-app>
  </template>

<!-- Script -->
<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios'

export default {
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
        employeeSkills: ["Python", "C++"],
        };
    },

    methods: {
        async getListing() {
            axios.get('http://localhost:3003/listing')
            .then(response => {
                var data = response.data.body
                // console.log(data)
                for (var i = 0; i < data.length; i++) {
                    if (data[i].listing_id == this.listing_id) {
                        this.listing = data[i]
                        // console.log(data[i])
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },

        async getRoleSkills() {
            axios.get('http://localhost:3003/rs')
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
            axios.get('http://localhost:3003/')
            .then(response => {
                var data = response //.data.body
                console.log(data)
                var employeeSkills = []
            
            })
            .catch(error => {
                console.log(error)
            })
        }
            
    },

    created() {
        this.getListing(),
        this.getRoleSkills(),
        this.getEmployeeSkills()
    },
};

</script>

<!-- Style -->
<style scoped>

</style>