<template>
  <div class="text-center">
    <v-btn
      color="primary"
      width="100%"
      height="100%"
      density="comfortable"
      size="large"
      variant="flat"
      id="Apply"
      :disabled="applied"
    >
      Apply

      <v-dialog v-model="dialog" activator="parent" width="700">
        <v-card id="popup">
          <v-card-title>Apply for role: {{ roleName }} </v-card-title>
          <v-card-item>
            <div>
              <!--Staff's personal details so they can check that the dettails-->
              <!--are correct before applying-->
              <div class="text-h6 mb-1">Contact Info</div>
              <div class="text">
                {{ staff._Staff_FName }} {{ staff._Staff_LName }}
              </div>
              <div class="text-caption">Department: {{ staff._Dept }}</div>
              <div class="text-caption">E-mail address: {{ staff._Email }}</div>

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
                <!--Section for staff to include more details for their application-->
                <!-- write up should not be longer than 500 words-->
                <v-col cols="2">
                  <div class="text mr-1">Write-up</div>
                </v-col>
                <v-col>
                  <v-form @submit.prevent>
                    <v-text-field
                      colour="deep-purple-accent-4"
                      label="Write a brief summary of why you should be chosen for this role"
                      id="writeUp"
                      :rules="[
                        (v) => !!v || 'Write-up is required',
                        (v) =>
                          (v.length > 0 && v.length <= 500) ||
                          'Write-up must be less than 500 characters',
                      ]"
                      v-model="writeUp"
                    ></v-text-field>
                    <v-btn
                      size="small"
                      type="submit"
                      color="primary"
                      class="mt-2"
                      id="submitForm"
                      @click="this.submitForm()"
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      size="small"
                      type="submit"
                      color="purple"
                      class="mt-2"
                      text="Close"
                      id="close"
                      @click="this.dialog = false"
                      style="margin-left: 15px"
                    ></v-btn>
                  </v-form>

                  <!-- v-dialog should only pop up when the rule of the text field is satisfied -->
                  <!-- else form validation should be performed and error message should show. confirmation popup should not appear-->
                  <v-dialog
                    v-model="SuccessDialog"
                    width="auto"
                    id="successDialog"
                  >
                    <v-card>
                      <div class="py-12 mx-9 text-center">
                        <v-icon
                          class="mb-6"
                          color="success"
                          icon="mdi-check-circle-outline"
                          size="120"
                        ></v-icon>
                        <div class="text-h6 font-weight-bold" id="successMsg">
                          Application Submitted Successfully!
                        </div>
                        <div class="text" id="successText">
                          Thank you for your application, kindly look out for an
                          update on your application status which will be sent
                          via email
                        </div>
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          class="text-none text-subtitle-1"
                          size="small"
                          variant="flat"
                          @click="
                            SuccessDialog = false;
                            dialog = false;
                            reloadPage()
                          "
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- V-DIALOG FOR WHEN THE APPLICATION FAILS BZZZZ -->
                  <v-dialog
                    v-model="ApplyFailDialog"
                    width="auto"
                    id="failDialog"
                  >
                    <v-card>
                      <div class="py-12 mx-9 text-center">
                        <v-icon
                          class="mb-6"
                          color="red"
                          icon="mdi-alert-circle-outline"
                          size="120"
                        ></v-icon>
                        <div class="text-h6 font-weight-bold" id="failedMsg">
                          Application Failed!
                        </div>
                        <!-- <div class="text">Thank you for your application, kindly look out for an update on your application status which will be sent via email</div> -->
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          class="text-none text-subtitle-1"
                          size="small"
                          variant="flat"
                          @click="ApplyFailDialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- V-DIALOG FOR WHEN THE THEY HAVE ALREADY APPLIED BEFORE??? -->
                  <v-dialog v-model="AlreadyAppDialog" width="auto">
                    <v-card>
                      <div class="py-12 mx-9 text-center">
                        <v-icon
                          class="mb-6"
                          color="orange"
                          icon="mdi-alert-circle-outline"
                          size="120"
                        ></v-icon>
                        <div class="text-h6 font-weight-bold">
                          Already Applied!
                        </div>
                        <div class="text">
                          You have already applied for this role listing
                        </div>
                        <!-- <div class="text">Thank you for your application, kindly look out for an update on your application status which will be sent via email</div> -->
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          class="text-none text-subtitle-1"
                          size="small"
                          variant="flat"
                          @click="AlreadyAppDialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      profile: (profile) => store.commit("profile", profile),
    };
  },
  name: "ApplyRLPopup",
  data() {
    return {
      dialog: false,
      SuccessDialog: false,
      ApplyFailDialog: false,
      AlreadyAppDialog: false,
      staff: this.$store.state.profile,
      writeUp: "", // Bind the input value to this data property
      applied: false,
    };
  },
  methods: {
    async submitForm() {
      console.log("Submit button clicked");
      // Check if the validation rule is satisfied
      if (this.validating()) {
        console.log("Validation passed");
        const bodyInfo = {
          staffId: this.staff._Staff_id,
          listingId: parseInt(this.roleId),
          writeUp: this.writeUp,
        };
        await this.postApply(bodyInfo);

        //.dialog4 = true; // should also clear the this.writeUp
        //call function here to run the back end..
        // location.reload();
      } else {
        console.log("Validation failed!");
        this.ApplyFailDialog = true;
      }
    },
    validating() {
      if (this.writeUp.length > 500 || this.writeUp === "") {
        return false;
      }
      return true;
    },
    async postApply(bodyInfo) {
      await axios
        .post("http://localhost:3003/application", bodyInfo)
        .then(async (response) => {
          // alert("Role Listing created successfully!")
          if (response.data.body.affectedRows == 0) {
            //alert("You've already applied previously??")
            this.AlreadyAppDialog = true;
          } else {
            this.SuccessDialog = true;
            let thisobj = {
              _staff_Id: this.staff._Staff_id,
              _listing_Id: parseInt(this.roleId),
              _write_Up: this.writeUp,
            };
            this.staff._Applications.push(thisobj);
            await this.profile(this.staff);
            // console.log(this.$store.state.profile)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isapplied() {
      let apply = this.$store.state.profile._Applications;
      for (var j = 0; j < apply.length; j++) {
        var obj = apply[j];
        if (obj._listing_Id == this.roleId) {
          this.applied = true;
        }
      }
      // alert("Role Listing created successfully!" + this.jobtitle + "\n" + this.rolename + "\n" + this.jobdescription + "\n" + this.dept + "\n" + this.vacancies + "\n" + this.country + "\n" + this.expirydate)
    },
    reloadPage(){
      location.reload()
    }
  },
  mounted() {
    this.isapplied();
  },
  props: {
    roleName: String,
    roleId: Number,
  },
};
</script>
