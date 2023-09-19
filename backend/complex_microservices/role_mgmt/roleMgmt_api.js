const express = require("express");
const mysql = require("mysql");
const axios = require('axios');
require("dotenv").config();
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "role",
});


const roleMS = 'http://localhost:3000/';
const roleSkillMS = 'http://localhost:3001/';


app.use(bodyParser.json());
con.connect();


app.get('/', (req, res) => {
  res.send('Testing Hello World! from roleMgmt_api')
})


// THIS IS GET /ROLE => TO GET ALL ROLES FOR FRONTEND
app.get('/allrole', async (req, res) => {
  console.log(req.body)
  //res.send(req.body)
  //{"role_name":"TestName","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1}

  //invoking role ms
  axios.get(roleMS + 'role')
  .then((response) => {
      // Do something with the list of users.
      res.send(response.data)
    })
    .catch((error) => {
      // Handle the error.
      res.send(error)
    });
})

app.post('/createRole', async (req, res) => {
    console.log(req.body)
    //res.send(req.body)
    //{"role_name":"TestName21","dept":"Cyber","country":"SG","num_openings":10,"expiry_date":"2024-10-10","open":1}

    axios.post(roleMS + 'role', req.body)
    .then((response) => {
        // Do something with the list of users.
        res.send(response.data)
        })
        .catch((error) => {
        // Handle the error.
        res.send(error)
        });
    //status is 200 and okay but nothing is res out, i think cus SQL cfm 'msg' is just an empty string
    //it works slay
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })