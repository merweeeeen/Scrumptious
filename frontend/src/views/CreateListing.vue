<template>
    <div class="home mt-15 fill-height">
      <h1 style="color: blueviolet; display:block">Create a role listing (as a HR)</h1>
      <!-- <p>This is the home page of my Vue.js application.</p> -->
      <v-container class="containerStyle">
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
            id = 'rolelistings'
            v-model="rolename"
            variant="outlined"
            :items=this.roleslist
            :placeholder="this.roleslist.length == 0 
              ? 'An error has occurred, please check connection or refresh and try again'
              : 'Select a role'"
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
            :rules="[v => v.indexOf('.') == -1 && v.indexOf('-')|| 'Please key in a positive whole number only.']"
            v-model="vacancies" type="number" placeholder="Please key in the number of vacancies">
          </v-text-field>
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
    </v-container>
    </div>

    <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-text>
            You have successfully created the role listing!
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="reloadPage()">Okay</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      
    <v-dialog
      v-model="invalid"
      width="auto"
    >
      <v-card>
        <v-card-text>
          <p style="text-align: center;">Please Try Again</p>
          <v-list-item v-for="error in errormsg">{{error}}</v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="clearError()">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'CreatePage',
    data() {
      // in the future access needs to be a prop that is passed around
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

        dialog: false,
        validform: false,
        invalid: false,
        errormsg: [],

        profile: this.$store.state.profile,
        }
    },
    methods: {
    async getRoleSkills() {
      axios.get('http://localhost:3003/rs')
      .then(response => {
        this.responseHolder = response.data
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
      })
      .catch(error => {
        console.log(error)
        //document.getElementById('rolelistings').placeholder = 'An error has occured, please refresh page'
        this.errormsg = ['An error has occurred, please refresh the page or try again later.']
        this.invalid = true;
      })
    },
    isValid(value){
      if (value == "" || value == null || value == undefined || value == []) {
        return false
      } else {
        return true
      }
    },
    validation(){
      this.validform = true
      this.errormsg = []
      if (this.isValid(this.jobtitle) == false || this.isValid(this.rolename) == false || this.isValid(this.jobdescription) == false || this.isValid(this.dept) == false || this.isValid(this.vacancies) == false || this.isValid(this.country) == false || this.isValid(this.expirydate) == false) {
        this.validform = false
        this.errormsg.push("Please fill in all the fields")
      }
      if (Number(this.vacancies) <= 0 || Number(this.vacancies) % 1 !== 0) {
        this.validform = false
        this.errormsg.push("Vacancy should only be a positive whole number")
      }
      if (this.jobdescription.length > 250) {
        this.validform = false
        this.errormsg.push("Job description is too long")
      }
      if (Date.parse(this.expirydate) <= new Date()) {
        this.validform = false
        this.errormsg.push("Expiry date should be in the future")
      }
    },
    submit() {
      this.validation()
      // console.log(this.isValid(this.jobtitle) + "\n" + this.isValid(this.rolename) + "\n" + this.isValid(this.jobdescription) + "\n" + this.isValid(this.dept) + "\n" + this.isValid(this.vacancies) + "\n" + this.isValid(this.country) + "\n" + this.isValid(this.expirydate))
      // if ( this.isValid(this.jobtitle) == false || this.isValid(this.rolename) == false || this.isValid(this.jobdescription) == false || this.isValid(this.dept) == false || this.isValid(this.vacancies) == false || this.isValid(this.country) == false || this.isValid(this.expirydate) == false) {
      if (this.validform == false){
        // alert(this.errormsg)
        console.log(this.errormsg)
        this.invalid = true
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
        axios.post('http://localhost:3003/listing', bodyInfo)
        .then(response => {
          // alert("Role Listing created successfully!")
          this.dialog = true
          // alert("Role Listing created successfully!" + this.jobtitle + "\n" + this.rolename + "\n" + this.jobdescription + "\n" + this.dept + "\n" + this.vacancies + "\n" + this.country + "\n" + this.expirydate)
        })
        .catch(error => {
          console.log(error)
          this.errormsg = ['Creation of listing was unsuccessful, please refresh the page or try again later.']
          this.invalid = true;
        })
        
      }
    },
    clearError(){
      this.invalid = false
    },
    checkAccess() {
      if (this.profile._Access_Rights == 1) {
        return true
      } else {
        // alert("You do not have access to this page")
        this.$router.push('/')
        return false
      }
    },
    reloadPage() {
      this.dialog = false
      window.location.reload();
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
  },
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
    align-items: center;
  }
  
  .containerStyle {
    margin: 20px 10px 20px 10px;
    max-width: 85%;
    border: 5px solid #f4d5ff;
    border-radius: 20px;
    display: inline-block;
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