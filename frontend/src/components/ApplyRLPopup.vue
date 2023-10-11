<template>
    <div class="text-center">
        <v-btn
        color="primary"
        width = 100%
        height="100%"
        density="comfortable"
        size="large"
        variant="flat" 
        id = "Apply"
        >
        Apply

        <v-dialog
            v-model="dialog"
            activator="parent"
            width="700"
        >
            <v-card>
            <v-card-title>Apply for role: {{this.roleName}}</v-card-title>
            <v-card-item>
                <div>
                    <!--Staff's personal details so they can check that the dettails-->
                    <!--are correct before applying-->
                    <div class="text-h6 mb-1">
                        Contact Info
                    </div>
                    <div class="text">
                        {{ this.staff._Staff_FName }} {{ this.staff._Staff_LName }}
                    </div>
                    <div class="text-caption">
                        {{ this.staff._Dept }} | {{ currRole }}
                    </div>
                    <div class="text-caption">
                        E-mail address: {{ this.staff._Email }} | Phone number: {{phone}}
                    </div>


                    <!-- <div class="text-h6">
                        Resume
                    </div> -->
                    <!-- <div class="text-caption mb-1">
                        Be sure to include an updated resume*
                    </div> -->
                    
                    <!--Select previously used resume-->
                    <!-- <v-combobox
                    clearable
                    chips
                    label="Select Resume"
                    :items="['JohnDoe_Resume', 'JohnDoe_Resume1']"
                    variant="outlined"
                    ></v-combobox> -->

                    <!-- <div class="text">
                        Upload Resume
                    </div> -->
                    <!-- <v-btn color="primary" 
                        class="text-none text-subtitle-1"
                        size="small"
                        variant="outlined" 
                        @click="dialog = false">Upload Resume
                    </v-btn> -->

                    <!--for staff to upload an updated resume-->
                    <!-- <v-file-input
                        chips
                        clearable
                        accept="image/png, image/jpeg, image/bmp, application/pdf"
                        label="Upload Resume"
                        density = "compact"
                        color="deep-purple-accent-4"
                    ></v-file-input> -->
                </div>
            </v-card-item>

            <v-card-text>
                <v-container>
                    <v-row>
                    <!-- <v-col
                        cols="12"
                        sm="3"
                        md="3"
                    > -->
                    <!--Section for staff to include more details for their application-->
                    <div>
                        <div class="text mr-1">
                            Write-up
                        </div>
                    </div>
                    <!-- </v-col> -->
                    <!-- <v-col
                        cols="12"
                        sm="6"
                        md="9"
                    > -->
                        <v-text-field
                        colour="deep-purple-accent-4"
                        label="Write a brief summary of why you should be chosen for this role"
                        ></v-text-field>
                    <!-- </v-col> -->
                    </v-row>
                </v-container>
            </v-card-text>

            <!--Submit button-->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" 
                class="text-none text-subtitle-1"
                size="small"
                variant="flat" 
                @click="dialog2 = false"
                >
                    Submit
                    <!--pop up for confirmation of successful submission-->
                    <v-dialog
                    v-model="dialog2"
                    activator="parent"
                    width="500"
                    persistent
                    >
                    <v-card>
                    <!-- <v-card append-icon = "$close"> -->
                        <!-- <template v-slot:append>
                            <v-btn icon="$close" variant="text" @click="dialog2 = false"></v-btn>
                        </template> -->
                        <div class="py-12 mx-9 text-center">
                            <v-icon
                                class="mb-6"
                                color="success"
                                icon="mdi-check-circle-outline"
                                size="120"
                            ></v-icon>
                            <div class="text-h6 font-weight-bold">Application Submitted Successfully!</div>
                            <div class="text">Thank you for your application, kindly look out for an update on your application status which will be sent via email</div>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" 
                            class="text-none text-subtitle-1"
                            size="small"
                            variant="flat" 
                            @click="dialog2 = false;dialog = false"
                            >
                            Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-btn>
            </v-card-actions>

        </v-card>
        </v-dialog>
        </v-btn>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ApplyRLPopup",
        data () {
        return {
            dialog: false,
            dialog2: false,
            staff: this.$store.state.staff,
        }
        },
        props: {
            roleName: String,
            currRole: String,
            phone: String,
        },
    }
</script>