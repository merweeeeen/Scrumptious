<template>
    <div class="home">
      <h1 style="color: blueviolet; display:block">Create a role listing (as a HR)</h1>
      <!-- <p>This is the home page of my Vue.js application.</p> -->
      <container class="containerStyle">
      <v-form>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Job Title</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            v-model="jobtitle" label="Job Title" placeholder="edit me">
          </v-text-field>
        </v-col>
      </v-row>
      <!-- <p>Title is: {{jobtitle}}</p> -->
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Role Name</p>
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="rolename"
            variant="outlined"
            clearable
            label="Role Name"
            :items="['Software Analysis', 'Administration', 'Consultant', 'Accountant', 'Software Architect', 'Business Analyst', 'Data Analyst', 'Data Scientist', 'Database Administrator', 'DevOps Engineer', 'Front End Developer', 'Full Stack Developer', 'Game Developer', 'Graphic Designer', 'Hardware Engineer', 'Information Security Analyst', 'IT Manager', 'Mobile Developer', 'Network Engineer', 'Product Manager', 'Project Manager', 'Quality Assurance Engineer', 'Software Developer', 'Software Engineer', 'Systems Administrator', 'Systems Analyst', 'UX Designer', 'Video Game Designer', 'Web Developer', 'Webmaster','Cyber Security','Tech Staff']"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <!-- <p>Role is: {{rolename}}</p> -->
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Job Description</p>
        </v-col>
        <v-col cols="8">
          <v-textarea 
            variant="outlined"
            counter
            :rules="[v => v.length <= 250 || 'Max 250 characters']"
            v-model="jobdescription" label="Job Description" placeholder="edit me">
          </v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Skills Required</p>
        </v-col>
        <v-col cols="8">
          <v-text-field v-model="skillsrequired" label="Skills Required" placeholder="edit me"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Department</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            v-model="dept" label="Department" placeholder="edit me">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Vacancies</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            v-model="vacancies" label="Vacancies" placeholder="edit me">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Country</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            v-model="country" label="Country" placeholder="edit me">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Expiry Date</p>
        </v-col>
        <v-col cols="8">
          <v-text-field v-model="expirydate" label="Expiry Date" placeholder="edit me"></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    </container>
      <v-btn @click="greet">Greet</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'Home',
    data() {
        return {
        responseHolder: {},
        jobtitle: "",
        rolename: "",
        jobdescription: "",
        skillsrequired: "",
        dept: "",
        vacancies: "",
        country: "",
        expirydate: "",

        content: [],

        access: "HR"
        }
    },
    methods: {
    async getRoleSkills() {
      axios.get('http://localhost:3003/rs')
      .then(response => {
        this.responseHolder = response.data
        console.log(response.data)
        console.log( "THIS IS DATA RECIEVED" + this.responseHolder)
        this.content = this.responseHolder.body
        for (var i = 0; i < this.responseHolder.body.length; i++) {
          console.log(this.responseHolder.body[i].rolename)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },

    greet() {
        // `this` inside methods points to the current active instance
        alert(`Hello ${this.access}! ${this.jobtitle}`)
        // `event` is the native DOM event
    }
  },
  created() {
    this.getRoleSkills();
  }
}
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .home {
    text-align: center;
    padding: 15px;
    max-width: 100vw;
    max-height:  max-content;
    margin: 0 0 0 0;
    border: 5px solid #24ec38;
  }
  
  .containerStyle {
    margin: 40px;
    border: 5px solid #f4d5ff;
    border-radius: 20px;
    display: block;
    padding: 20px;
  }

  .contentCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-size: 1.0em;
    font-weight: bold;
  }


  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2em;
  }
  </style>