<template>
  <div class="d-flex align-center flex-column">
    <div>
      <v-card
        width="100%"
        min-width="400px"
        color="black"
        variant="outlined"
        onmouseover="this.style.boxShadow='0 0 10px 0 rgba(0,0,0,0.5)'; show=true"
        onmouseleave="this.style.boxShadow='none';show=false;"
        :id="identified"
      >
        <!-- Role Name and when done, bookmark/3 dot icon -->
        <v-card-item class="mt-0 w-100">
          <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px">
              <v-col class="pa-0">
                <v-card-title>{{ roleName }}</v-card-title>
              </v-col>

              <!-- This should be where the bookmark/3 dot icon should go -->
              <v-col class="pa-0">
                <!-- <v-icon icon="fa:fas fa-list"></v-icon> -->
                <!-- <v-text class="text-caption text-grey-darken-2">More</v-text> -->
              </v-col>
            </v-row>
          </v-container>

          <!-- Info about role: Department, Openings, Applicants, Full Time -->
          <v-text class="text-caption text-grey-darken-2">
            {{ Department }} | {{ num_openings }} Opening(s)
          </v-text>

          <!-- Skills Matched Percentage Bar -->
          <!-- <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px;">
                <v-text class="text-subtitle-1">Skills Matched</v-text>
            </v-row>
            <v-row no-gutters align="center" style="height: 25px;">
            <v-col class="pa-1">
                <v-sheet class="rounded-5 bg-transparent" style="border: solid 1px black; border-radius: 10px;">
                    <v-progress-linear 
                        v-bind:model-value="skillsPctMatch"
                        v-bind:bg-color="primaryColor"
                        v-bind:color="secondaryColor"
                        rounded
                        :height="15"
                    >
                    <v-text class="text-caption">{{getSkillsPctMatch(this.employeeSkills, this.roleInfo.Skills_Required)}}%</v-text>
                </v-progress-linear>
                </v-sheet>
            </v-col>
            </v-row>
        </v-container>
    -->
          <!-- Last Updated -->
          <v-container class="pa-0">
            <v-row no-gutters justify="space-between" style="height: 25px">
              <v-col cols="auto">
                <v-text class="text-caption text-grey-darken-2">{{
                  days_posted(created_at)
                }}</v-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- <v-btn
                  width="100%"
                  height="100%"
                  density="comfortable"
                  size="large"
                  variant="flat"
                  v-bind:color="primaryColor"
                  id="apply"
                  v-show="this.$store.state.profile._Access_Rights == 0"
                  >Apply</v-btn
                > -->
                    <ApplyRLPopup
                    :roleName="this.roleName"
                    :roleId="this.roleId"
                    id="ApplyRLPopup"
                    />
              </v-col>
            </v-row>
          </v-container>
        </v-card-item>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card
        width="100%"
        min-width="400px"
        color="red"
        variant="flat"
        onmouseover="this.style.boxShadow='0 0 10px 0 rgba(0,0,0,0.5)'; show=true"
        onmouseleave="this.style.boxShadow='none';show=false;"
        v-if="open == 0 && this.$store.state.profile._Access_Rights == 1"
      >
        <!-- Role Name and when done, bookmark/3 dot icon -->
        <v-card-item class="mt-0 w-100">
          <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px">
              <v-col class="pa-0">
                <v-card-title>{{ roleName }}</v-card-title>
              </v-col>

              <!-- This should be where the bookmark/3 dot icon should go -->
              <v-col class="pa-0">
                <!-- <v-icon icon="fa:fas fa-list"></v-icon> -->
                <!-- <v-text class="text-caption text-grey-darken-2">More</v-text> -->
              </v-col>
            </v-row>
          </v-container>

          <!-- Info about role: Department, Openings, Applicants, Full Time -->
          <v-text class="text-caption">
            {{ Department }} | {{ num_openings }} Opening(s)
          </v-text>

          <!-- Skills Matched Percentage Bar -->
          <!-- <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px;">
                <v-text class="text-subtitle-1">Skills Matched</v-text>
            </v-row>
            <v-row no-gutters align="center" style="height: 25px;">
            <v-col class="pa-1">
                <v-sheet class="rounded-5 bg-transparent" style="border: solid 1px black; border-radius: 10px;">
                    <v-progress-linear 
                        v-bind:model-value="skillsPctMatch"
                        v-bind:bg-color="primaryColor"
                        v-bind:color="secondaryColor"
                        rounded
                        :height="15"
                    >
                    <v-text class="text-caption">{{getSkillsPctMatch(this.employeeSkills, this.roleInfo.Skills_Required)}}%</v-text>
                </v-progress-linear>
                </v-sheet>
            </v-col>
            </v-row>
        </v-container>
    -->
          <!-- Last Updated -->
          <v-container class="pa-0">
            <v-row no-gutters justify="space-between" style="height: 25px">
              <v-col cols="auto">
                <v-text class="text-caption">{{
                  days_posted(created_at)
                }}</v-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card-item>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>

<script>
import ApplyRLPopup from './ApplyRLPopup.vue';

export default {
  name: "ListingCard",
    props: {
        roleName: String,
        roleId: Number,
        Department: String,
        num_openings: Number,
        created_at: String,
        open: Number,
        access: String,
        identified: String,
        // employeeSkills: Array,
        // lastUpdated: String,
        // primaryColor: String,
        // secondaryColor: String
    },
    data() {
        // skillsPctMatch = getSkillsPctMatch(this.employeeSkills, this.employeeSkills);
    
        return {
            show: false,
            employeeSkills: ["Python", "C++"],
            skillsPctMatch: "",
            primaryColor: "grey",
            secondaryColor: "grey-lighten-1",
            applications: this.$store.state.profile._Applications,
            //applied: false
            // access: (access) => store.commit("access", access)
        };
    },
    methods: {
        // getSkillsPctMatch(employeeSkills, roleSkills) {
        //     var numSkillsMatched = 0;
        //     for (var i = 0; i < employeeSkills.length; i++) {
        //         if (roleSkills.includes(employeeSkills[i])) {
        //             numSkillsMatched++;
        //         }
        //     }

        //     // The line below updates the skillsPctMatch variable
        //     this.skillsPctMatch = Math.round((numSkillsMatched / roleSkills.length) * 100);
        //     return Math.round((numSkillsMatched / roleSkills.length) * 100);
        // },
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
        // isapplied(){
        //   for (eachapplicant in this.$store.state.profile._Applications){
        //     if (eachapplicant._listing_id = this.roleId){
        //       this.applied = true
        //     }
        //   }
        // }
    },

    mounted() {
        // console.log(this.$store.state.profile);
        // this.isapplied()
        
    },
    components: {
        ApplyRLPopup,
    }
};

function getSkillsPctMatch(employeeSkills, roleSkills) {
  var numSkillsMatched = 0;
  for (var i = 0; i < employeeSkills.length; i++) {
    if (roleSkills.includes(employeeSkills[i])) {
      numSkillsMatched++;
    }
  }
  return Math.round((numSkillsMatched / roleSkills.length) * 100);
}
</script>

<style>
.v-card-item * {
  justify-content: start;
  margin: 0px;
}
</style>
