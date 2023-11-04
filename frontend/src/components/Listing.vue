<template>
  <div class="d-flex align-center flex-column">
    <div style="width:40vw">
      <v-card
        width="100%"
        min-width="400px"
        color="red"
        variant="flat"
        onmouseover="this.style.boxShadow='0 0 10px 0 rgba(0,0,0,0.5)'; show=true"
        onmouseleave="this.style.boxShadow='none';show=false;"
        :id="identified"
        v-if="open == 0 && this.$store.state.profile._Access_Rights == 1"
      >
        <!-- Role Name and when done, bookmark/3 dot icon -->
        <v-card-item class="mt-0 w-100">
          <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px">
              <v-col class="pa-0">
                <v-card-title id="roleName">{{ roleName }}</v-card-title>
              </v-col>

              <!-- This should be where the bookmark/3 dot icon should go -->
              <v-col class="pa-0">
              </v-col>
            </v-row>
          </v-container>

          <!-- Info about role: Department, Openings, Applicants, Full Time -->
          <v-text class="text-caption" id="deptAndOpenings">
            {{ Department }} | {{ num_openings }} Opening(s)
          </v-text>
          <v-container class="pa-0">
            <v-row no-gutters justify="space-between" style="height: 25px">
              <v-col cols="auto">
                <v-text class="text-caption" id="daysPosted">{{
                  days_posted(created_at)
                }}</v-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card-item>

      </v-card>
      <v-card
        width="100%"
        min-width="400px"
        color="black"
        variant="outlined"
        onmouseover="this.style.boxShadow='0 0 10px 0 rgba(0,0,0,0.5)'; show=true"
        onmouseleave="this.style.boxShadow='none';show=false;"
        :id="identified"
        v-else
      >
        <!-- Role Name and when done, bookmark/3 dot icon -->
        <v-card-item class="mt-0 w-100">
          <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px">
              <v-col class="pa-0">
                <v-card-title id="roleName">{{ roleName }}</v-card-title>
              </v-col>

              <!-- This should be where the bookmark/3 dot icon should go -->
              <v-col class="pa-0">
              </v-col>
            </v-row>
          </v-container>

          <!-- Info about role: Department, Openings, Applicants, Full Time -->
          <v-text class="text-caption text-grey-darken-2" id="deptAndOpenings">
            {{ Department }} | {{ num_openings }} Opening(s)
          </v-text>
          
          <v-container class="pa-0">
            <v-row no-gutters justify="space-between" style="height: 25px">
              <v-col cols="auto">
<<<<<<<<< Temporary merge branch 1
                <v-text class="text-caption" id="daysPosted">{{
=========
                <v-text class="text-caption">
                  Expires: {{ expiry_date }}
                </v-text>
              </v-col>
            </v-row>
            <v-row no-gutters justify="space-between" style="height: 25px">
              <v-col cols="auto">
                <v-text class="text-caption" id="daysPosted">{{
                  days_posted(created_at)
                }}</v-text>
              </v-col>
            </v-row>
          </v-container>

          <!-- Skills Matched Percentage Bar -->
          <v-container
            class="pa-0 mt-1"
            v-if="this.$store.state.profile._Access_Rights === '0'"
          >
            <v-row no-gutters align="center" style="height: 25px">
              <v-text class="text-subtitle-1">Skills Matched</v-text>
              <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      @click.stop="show = !show"
                      id="show"
                    ></v-btn>
                  </v-card-actions>
            </v-row>
            <v-row>
              <v-col></v-col>
            </v-row>
            <v-row class="ma-0 ">
              <v-col class="pb-0">
                

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>
                  
                      <!--skills Matched-->
                        <v-card-text>
                          <v-chip
                            v-for="skill in listingSkills"
                            class="ma-1"
                            variant="tonal"
                            :color="
                              employeeSkills.includes(skill)
                                ? 'green-darken-3'
                                : 'default'
                            "
                            :id="skill"
                          >
                            {{ skill }}
                          </v-chip>
                        </v-card-text>

                    </div>
                  </v-expand-transition>


                <!-- </v-card> -->
              </v-col>
            </v-row>
            <v-row no-gutters align="center" style="height: 25px">
              <v-col class="pa-1">
                <v-sheet
                  class="rounded-5 bg-transparent"
                  style="border: solid 1px black; border-radius: 10px"
                >
                  <v-progress-linear
                    v-bind:model-value="skillsPctMatch"
                    v-bind:bg-color="primaryColor"
                    v-bind:color="secondaryColor"
                    rounded
                    :height="15"
                  >
                    <v-text class="text-caption" id="skillsMatchPct"
                      >{{
                        this.getSkillsPctMatch(
                          this.employeeSkills,
                          this.$props.skills
                        )
                      }}%</v-text
                    >
                  </v-progress-linear>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>

          <!-- Last Updated -->
          <v-container class="pa-0">
            <v-row v-if="this.$store.state.profile._Access_Rights === '0'">
              <v-col>
                <ApplyRLPopup
                  :roleName="this.roleName"
                  :roleId="this.roleId"
                  id="ApplyRLPopup"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import ApplyRLPopup from "./ApplyRLPopup.vue";

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
    expiry_date: String,
    identified: String,
    skills: Array,
  },
  data() {
    return {
      show: false,
      employeeSkills: this.$store.state.profile._Skills ?? [],
      skillsPctMatch: 0,
      primaryColor: "grey",
      secondaryColor: "grey-lighten-1",
      applications: this.$store.state.profile._Applications,
      listingSkills: [],
      show: false,
    };
  },
  methods: {
    getSkillsPctMatch(employeeSkills, roleSkills) {
      const Rskills = [];
      for (var i = 0; i < roleSkills.length; i++) {
        Rskills.push(roleSkills[i].skill_name);
      }
      this.listingSkills = Rskills;
      var numSkillsMatched = 0;
      for (var i = 0; i < employeeSkills.length; i++) {
        if (Rskills.includes(employeeSkills[i])) {
          numSkillsMatched++;
        }
      }
      this.skillsPctMatch = Math.round(
        (numSkillsMatched / roleSkills.length) * 100
      );
      return Math.round((numSkillsMatched / roleSkills.length) * 100);
    },
    days_posted(created_at) {
      var today = new Date();
      var created = new Date(created_at);
      var diff = today - created;
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days == 1) {
        return "Posted " + days + " day ago";
      } else if (days == 0) {
        return "Posted today";
      } else {
        return "Posted " + days + " days ago";
      }
    },
  },

  components: {
    ApplyRLPopup,
  },
};
</script>

<style>
.v-card-item * {
  justify-content: start;
  margin: 0px;
}
</style>
