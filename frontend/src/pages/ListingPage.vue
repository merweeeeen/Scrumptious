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
                                {{listing.info["Department"]}}
                            </p>
                            <p class="text-h7 text--primary">
                                {{listing.info["Openings"]}} Openings | {{listing.info["Applicants"]}} Applicant(s)
                            </p>
                            <p class="text-h7 text--primary">
                                Job Type: {{listing.info["Full Time"]}}
                            </p>
                            <p class="text-h7 text--primary">
                                Closing in: {{listing.info["Closing in"]}} 
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
                                {{listing.info["Description"]}} 
                            </p>
                            <br>
                            <p class="text-h6 text--primary">
                                Skillset Required
                            </p>
                            <v-chip v-for="skill in listing.info['Skills_Required']" class="ma-1"
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
        listing: {
            listing_id: 1234,
            listing_name: "Software Engineer",
            country: "Singapore",
            info: {
                "Department": "Information Technology",
                "Openings": "2",
                "Applicants": "4",
                "Closing in": "11 Days",
                "Full Time": "Full Time",
                "Skills_Required":["Python", "HTML", "Javascript", "C++"],
                "Description": "Lorem ipsum dolor sit amet, consectet adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla."
            },
            },
        listing_id: this.$route.params.listing_id,
        // listing: {},
        primaryColor: "black",
        employeeSkills: ["Python", "C++"],
        };
    },

    methods: {
        async getRoleSkills() {
            axios.get('http://localhost:3003/listing')
            .then(response => {
                // this.responseHolder = response.data
                console.log(response.data)
                data = response.data
                for (var i = 0; i < data.length; i++) {
                
                console.log(data[i])
                if (this.roleslist.indexOf(this.responseHolder.body[i].role_name) !== -1) {
                    this.listtoskills[this.responseHolder.body[i].role_name].push(this.responseHolder.body[i].skill_name)
                } else {
                    console.log("not in list")
                    this.roleslist.push(this.responseHolder.body[i].role_name)
                    this.listtoskills[this.responseHolder.body[i].role_name] = [this.responseHolder.body[i].skill_name]
                }
                }
                console.log(this.listtoskills)
                console.log(this.roleslist)
            })
            .catch(error => {
                console.log(error)
            })
            },
            isValid(value){
            if (value == "" || value == null || value == undefined || value == []) {
                return false
            } else {
                return true
            }
        },
    },

    mounted() {
        this.getRoleSkills()
    },
};

</script>

<!-- Style -->
<style scoped>

</style>