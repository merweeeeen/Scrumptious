<template>
    <v-container class="justify-center">
        <v-row class ='flex-column border rounded-xl'>
            <v-col>
                    <p>Search for a role listing:</p>
                    <v-text-field
                        append-icon="mdi-magnify"
                        label="Search"
                        bg-color="white"
                        single-line
                        hide-details
                    ></v-text-field>
            </v-col>
            <v-col>
                <v-btn
                elevation="0"
                class="w-100 justify-start"
                >
                <v-icon>mdi-bookmark-outline</v-icon>
                    &nbsp; Saved Jobs
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                elevation="0"
                class="mt-n8 w-100 justify-start"
                >
                <v-icon>mdi-clock-outline</v-icon>
                    &nbsp; Recently viewed
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                elevation="0"
                class="mt-n12 w-100 justify-start"
                >
                <v-icon>mdi-file-document-edit-outline</v-icon>
                    &nbsp; My applications
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col> 
            </v-col>
        </v-row>
        <v-row class=" border rounded-xl ">
            <v-col>
                Filter by:
                <v-checkbox
                label="Department"
                color="indigo">
                </v-checkbox>
                <v-checkbox
                label="Full Time"
                color="indigo"
                class="mt-n12">
                </v-checkbox>
                <v-checkbox
                label="Part Time"
                color="indigo"
                class="mt-n12">
                </v-checkbox>
                <v-checkbox
                label="Skills"
                color="indigo"
                class="mt-n12">
                </v-checkbox>
            </v-col>
        </v-row>
    </v-container>
</template>