
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
        <template v-for="(info, index) in roleInfo">
            <template v-if="index > 0"> <v-text class="text-caption text-grey-darken-2"> | </v-text></template>
            <v-text 
                class="text-caption text-grey-darken-2"
            >
            {{info}}
            </v-text>
        </template>

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
                    <v-text class="text-caption">{{skillsPctMatch}}%</v-text>
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
                    >Apply</v-btn>
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
    return {
        roleName: "Software Developer",
        roleInfo: ["Information Technology", "2 Openings", "4 Applicants", "Closing in 11 Days", "Full Time"],
        skillsPctMatch: "90",
        lastUpdated: "Posted 4 Days ago",
        primaryColor: "grey",
        secondaryColor: "grey-lighten-1"
    };
  },
};
</script>

<style>
    .v-card-item * {  
        justify-content: start;
        margin: 0px;
    }
</style>