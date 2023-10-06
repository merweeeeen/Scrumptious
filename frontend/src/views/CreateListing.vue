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
            v-model="jobtitle" placeholder="Fill in the title of the Role Listing">
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
            :items=this.roleslist
            placeholder="Select a role"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <!-- <p>            :items="['Software Analysis', 'Administration', 'Consultant', 'Accountant', 'Software Architect', 'Business Analyst', 'Data Analyst', 'Data Scientist', 'Database Administrator', 'DevOps Engineer', 'Front End Developer', 'Full Stack Developer', 'Game Developer', 'Graphic Designer', 'Hardware Engineer', 'Information Security Analyst', 'IT Manager', 'Mobile Developer', 'Network Engineer', 'Product Manager', 'Project Manager', 'Quality Assurance Engineer', 'Software Developer', 'Software Engineer', 'Systems Administrator', 'Systems Analyst', 'UX Designer', 'Video Game Designer', 'Web Developer', 'Webmaster','Cyber Security','Tech Staff']"</p> -->
      <!-- <p>Role is: {{rolename}}</p> -->
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Skills Required:</p>
        </v-col>
        <v-col cols="8">
          <v-chip v-for="skill in listofskills" class="chipPadding">
            {{skill}}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Job Description</p>
        </v-col>
        <v-col cols="8">
          <v-textarea 
            variant="outlined"
            counter
            :rules="[v => v.length <= 250 || 'Max 250 characters']"
            v-model="jobdescription" placeholder="Provide additional description on the listing here">
          </v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Department</p>
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="dept"
            variant="outlined"
            clearable
            :items='["IT Support","Customer Service","Finance","Marketing","Sales","Human Resources","Operations","Research and Development","Management","Engineering","Design","Others"]'
            placeholder="Select a department"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Vacancies</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            :rules="[v => v.indexOf('.') == -1 || 'Please key in a whole number only.']"
            v-model="vacancies" type="number" placeholder="Please key in the number of vacancies">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Country</p>
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="country"
            variant="outlined"
            clearable
            :items='["Singapore","Malaysia","Thailand","Korea","Japan"]'
            placeholder="Select a country"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="contentCenter">
          <p class="text">Expiry Date</p>
        </v-col>
        <v-col cols="8">
          <v-text-field 
            variant="outlined"
            v-model="expirydate" type="date" label="Expiry Date" placeholder="edit me"></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="submit()">SUBMIT</v-btn>
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
        
        roleslist: [],
        listtoskills: {},

        access: "HR"
        }
    },
    methods: {
    async getRoleSkills() {
      axios.get('http://localhost:3003/rs')
      .then(response => {
        this.responseHolder = response.data
        // console.log(response.data)
        console.log(this.responseHolder)
        // this.content = this.responseHolder.body[0].role_name
        for (var i = 0; i < this.responseHolder.body.length; i++) {
          // this.content += [this.responseHolder.body[i].rolename]
          console.log(this.responseHolder.body[i].role_name)
          if (this.roleslist.indexOf(this.responseHolder.body[i].role_name) !== -1) {
            this.listtoskills[this.responseHolder.body[i].role_name].push(this.responseHolder.body[i].skill_name)
          } else {
            console.log("not in list")
            this.roleslist.push(this.responseHolder.body[i].role_name)
            this.listtoskills[this.responseHolder.body[i].role_name] = [this.responseHolder.body[i].skill_name]
          }
        }
        console.log(this.listtoskills)
        console.log(this.roleslist)
      })
      .catch(error => {
        console.log(error)
      })
    },
    isValid(value){
      if (value == "" || value == null || value == undefined || value == []) {
        return false
      } else {
        return true
      }
    },
    submit() {
      // console.log(this.isValid(this.jobtitle) + "\n" + this.isValid(this.rolename) + "\n" + this.isValid(this.jobdescription) + "\n" + this.isValid(this.dept) + "\n" + this.isValid(this.vacancies) + "\n" + this.isValid(this.country) + "\n" + this.isValid(this.expirydate))
      if ( this.isValid(this.jobtitle) == false || this.isValid(this.rolename) == false || this.isValid(this.jobdescription) == false || this.isValid(this.dept) == false || this.isValid(this.vacancies) == false || this.isValid(this.country) == false || this.isValid(this.expirydate) == false) {
        alert("Please fill in all the fields")
      } else {
        const bodyInfo = {
          listing_name: this.jobtitle,
          role_name: this.rolename,
          desc: this.jobdescription,
          dept: this.dept,
          num_openings: this.vacancies,
          country: this.country,
          expiry_date: this.expirydate,
          open: 1
        }
        // const jsonInfo = JSON.stringify(bodyInfo)
        console.log(bodyInfo)
        axios.post('http://localhost:3003/listing', bodyInfo)
        .then(response => {
          console.log(response)
          // alert("Role Listing created successfully!")
          alert("Role Listing created successfully!" + this.jobtitle + "\n" + this.rolename + "\n" + this.jobdescription + "\n" + this.dept + "\n" + this.vacancies + "\n" + this.country + "\n" + this.expirydate)
        })
        .catch(error => {
          console.log(error)
        })
        
      }
    },
    greet() {
        // `this` inside methods points to the current active instance
        alert(`Hello ${this.access}! ${this.jobtitle}`)
        // `event` is the native DOM event
    },
    checkAccess() {
      if (this.access == "HR") {
        return true
      } else {
        alert("You do not have access to this page")
        window.location.href = 'http://127.0.0.1:5173/Scrumptious/'
        return false
      }
    }
  },
  computed: {
    // a computed getter
    listofskills: function () {
      // `this` points to the vm instance
      if (this.roleslist.indexOf(this.rolename) !== -1) {
        return this.listtoskills[this.rolename]
      } else {
        return []
      }
    }
  },
  created() {
    this.checkAccess();
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
  
  .chipPadding {
    margin: 5px;
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