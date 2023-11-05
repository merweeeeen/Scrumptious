<template>
  <v-card class="card" style="padding: 20px">
    Staff ID<v-text-field
      label="Staff ID"
      style="width: 100%"
      v-model="staffId"
    ></v-text-field>
    Password<v-text-field
      type="password"
      label="Password"
      style="width: 100%"
      v-model="password"
    ></v-text-field>
    <p>Logging in as:</p>
    <v-select
      v-model="selected"
      :items="items"
      density="compact"
      style="width: 100%"
    ></v-select>
    <v-btn @click="login" id="login">Login</v-btn>
  </v-card>
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
  name: "Login",
  data: () => ({
    items: ["HR", "Staff"],
    selected: "Staff",
    staffId: "",
    password: "",
    accessRights: { Staff: 0, HR: 1 },
  }),
  methods: {
    async login() {
      try {
        const response = await axios.get(
          `http://localhost:3003/login/${this.staffId}/${this.password}/${
            this.accessRights[this.selected]
          }`
        );
        console.log(response.data);
        if (response.data.message === "Invalid Access") {
          alert("You are not authorised to use HR profile");
          return;
        }
        if (response.data.message === "Wrong Password") {
          alert("Wrong Password");
          return;
        }
        await this.profile(response.data.body);

        console.log(this.$store.state.profile);
        this.updateExpiredListing();
        this.$router.push("/");
      } catch (err) {
        if (err) {
          console.log(err);
          alert("Invalid Account.");
        }
      }
    },
    async updateExpiredListing() {
      try {
        const response = await axios.put(`http://localhost:3003/updateExpired`);
      } catch (err) {
        if (err) {
          console.log(err);
          console.log("Error updating expired listings");
        }
      }
    },
  },
  computed: {
    selectedRole() {
      return this.selected;
    },
  },
};
</script>

<style>
@media (min-width: 700px) {
  .card {
    margin: 25vh 37.5vw;
  }
}

@media (max-width: 700px) {
  .card {
    margin: 10vh 20vw;
  }
}
</style>
