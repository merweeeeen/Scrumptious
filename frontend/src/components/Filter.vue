<template>
  <v-container class="justify-center">
    <v-row class="flex-column border rounded-xl">
      <v-col>
        <p>Search for a job listing:</p>
        <v-text-field
          label="Search listing"
          append-icon="mdi-magnify"
          @click:append="searchListing"
          v-model="listing_name"
          bg-color="white"
          single-line
          hide-details
          id="searchBar"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn elevation="0" class="w-100 justify-start" @click="getFavourites" id="favourites">
          <v-icon>mdi-bookmark-outline</v-icon>
          &nbsp; Favourites
        </v-btn>
        <v-btn
          elevation="0"
          class="w-100 justify-start"
          @click="this.$router.push({ path: '/create' })"
          v-if="this.$store.state.profile._Access_Rights == 1"
        >
          <v-icon>mdi-plus-thick</v-icon>
          &nbsp; Create a new listing
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <!-- <v-row class="border rounded-xl" v-if="this.$store.state.profile._Access_Rights == 1">
        <v-col>
        <p>Search for a staff profile: </p>
        <v-text-field
          append-icon="mdi-magnify"
          @click:append="searchStaff"
          v-model="staff_name"
          label="Search staff"
          bg-color="white"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row> -->
    <v-row class="border rounded-xl">
      <v-col style="padding: 30px">
        <v-row> Filter by: </v-row>
        <v-row>
          <div>
            <v-checkbox
              label="Department"
              color="indigo"
              v-model="dept"
              @change="dept.length === 0 ? (selectedDept = 'Select') : null"
              id="checkDept"
            ></v-checkbox>
            <div
              v-if="dept.length > 0"
              class="mt-n7 mb-5 ms-3 justify-start"
              style="width: 20vw"
            >
              <v-select
                :items="depts"
                label="Department"
                color="indigo"
                style="font-size: 10px; width: 90%"
                v-model="selectedDept"
                id="dept"
              >
              </v-select>
            </div>
            <v-checkbox
              label="Skills"
              color="indigo"
              v-model="skill"
              class="mt-n12 w-100 justify-start"
              @change="skill.length === 0 ? (selectedSkill = 'Select') : null"
              id="checkSkill"
            ></v-checkbox>
            <div
              v-if="skill.length > 0"
              class="mt-n7 mb-5 ms-3 justify-start"
              style="width: 20vw"
            >
              <v-select
                :items="skills"
                label="Skill"
                color="indigo"
                style="font-size: 10px; width: 90%"
                v-model="selectedSkill"
                id="skill"
              >
              </v-select>
            </div>
            <v-checkbox
              label="Role Name"
              color="indigo"
              v-model="role"
              class="mt-n12 w-100 justify-start"
              @change="role.length === 0 ? (selectedRole = 'Select') : null"
              id="checkRole"
            ></v-checkbox>
            <div
              v-if="role.length > 0"
              class="mt-n7 mb-5 ms-3 justify-start"
              style="width: 20vw"
            >
              <v-select
                :items="roles"
                label="Role"
                color="indigo"
                style="font-size: 10px; width: 90%"
                v-model="selectedRole"
                id="role"
              >
              </v-select>
            </div>
            <v-checkbox
              label="Vacancies"
              color="indigo"
              v-model="vacancy"
              class="mt-n12 w-100 justify-start"
              @change="
                vacancy.length === 0 ? (selectedVacancy = 'Select') : null
              "
              id="checkVacancy"
            ></v-checkbox>
            <div
              v-if="vacancy.length > 0"
              class="mt-n7 mb-5 ms-3 justify-start"
              style="width: 20vw"
            >
              <v-select
                :items="vacancies"
                label="Vacancy"
                color="indigo"
                style="font-size: 10px; width: 90%"
                v-model="selectedVacancy"
                id="vacancy"
              >
              </v-select>
            </div>
            <v-btn class="ms-3" @click="emitFunction" id="filter">Filter</v-btn>
            <v-btn class="ms-3" @click="reset" id="reset">Reset</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  emits: ["filter", "reset", "searchListing", "searchStaff", "getFavourites"],
  props: ["skills", "roles", "depts"],
  data() {
    return {
      listing_name: "",
      staff_name: "",
      skill: [],
      role: [],
      dept: [],
      vacancy: [],
      vacancies: [1, 2, 3, 4, 5, 6, 7],
      selectedSkill: "Select",
      selectedDept: "Select",
      selectedRole: "Select",
      selectedVacancy: "Select",
    };
  },
  methods: {
    searchListing() {
      this.$emit("searchListing", this.listing_name);
      this.listing_name = "";
    },
    searchStaff() {
      this.$emit("searchStaff", this.staff_name);
    },

    emitFunction() {
      const filters = {
        skills: this.selectedSkill !== "Select" ? this.selectedSkill : null,
        role_name: this.selectedRole !== "Select" ? this.selectedRole : null,
        dept: this.selectedDept !== "Select" ? this.selectedDept : null,
        num_openings:
          this.selectedVacancy !== "Select" ? this.selectedVacancy : null,
      };
      this.$emit("filter", filters);
    },
    reset() {
      this.selectedSkill = "Select";
      this.selectedDept = "Select";
      this.selectedRole = "Select";
      this.selectedVacancy = "Select";
      this.skill = [];
      this.role = [];
      this.dept = [];
      this.vacancy = [];
      this.$emit("reset");
    },
    getFavourites() {
      this.$emit("getFavourites");
    },
  },
};
</script>
