
<template>
    <div class="d-flex align-center flex-column">  

    <div>
        <v-card 
            width=100% 
            max-width="450px"
            color="black" 
            variant="outlined"
        > 

        <!-- Role Name and when done, bookmark/3 dot icon -->
        <v-card-item class="mt-0">
          <v-container class="pa-0 mt-1">
            <v-row no-gutters align="center" style="height: 25px;">
                <v-col class="pa-0">
                    <v-card-title>{{roleName}}</v-card-title>
                </v-col>
                
                <!-- This should be where the bookmark/3 dot icon should go -->
                <v-col class="pa-0">
                    <!-- <v-icon icon="fa:fas fa-list"></v-icon> -->
                    <!-- <v-text class="text-caption text-grey-darken-2">More</v-text> -->
                </v-col>
            </v-row>
        </v-container>

        <!-- Info about role: Department, Openings, Applicants, Full Time -->
        <v-text 
                class="text-caption text-grey-darken-2"
            >
            {{roleInfo["Department"]}} | {{roleInfo["Openings"]}} Openings | {{roleInfo["Applicants"]}} Applicants | {{roleInfo["Full Time"]}}
        </v-text>

        <!-- Skills Matched Percentage Bar -->
        <v-container class="pa-0 mt-1">
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
        
        <!-- Last Updated -->
        <v-container class="pa-0">
            <v-row no-gutters justify="space-between" style="height: 25px;">
                <v-col cols="auto">
                    <v-text class="text-caption text-grey-darken-2">{{ lastUpdated }}</v-text>
                </v-col>
                
                <v-col cols="auto">
                    <v-btn 
                    density="comfortable"
                    size="small"
                    variant="flat"
                    v-bind:color="primaryColor"
                    id="apply"
                    >Apply</v-btn> <!--v-bind:color="primaryColor"-->
                </v-col>
            </v-row>
        </v-container>
          
        </v-card-item>

      </v-card> 
    </div>

    </div> 
  </template> 

<script>
export default {
  data() {
    // skillsPctMatch = getSkillsPctMatch(this.employeeSkills, this.employeeSkills);
    return {
        roleName: "Software Developer",
        roleInfo: {
            "Department": "Information Technology",
            "Openings": "2",
            "Applicants": "4",
            "Closing in": "11 Days",
            "Full Time": "Full Time",
            "Skills_Required":["Python", "HTML", "Javascript", "C++"]
        },
        employeeSkills: ["Python", "C++"],
        skillsPctMatch: "",
        lastUpdated: "Posted 4 Days ago",
        primaryColor: "grey",
        secondaryColor: "grey-lighten-1"
    };
  },
  methods: {
    getSkillsPctMatch(employeeSkills, roleSkills) {
        var numSkillsMatched = 0;
        for (var i = 0; i < employeeSkills.length; i++) {
            if (roleSkills.includes(employeeSkills[i])) {
                numSkillsMatched++;
            }
        }

        // The line below updates the skillsPctMatch variable
        this.skillsPctMatch = Math.round((numSkillsMatched / roleSkills.length) * 100);
        return Math.round((numSkillsMatched / roleSkills.length) * 100);
    }
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