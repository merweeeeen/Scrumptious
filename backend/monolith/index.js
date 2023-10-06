const express = require("express");
const app = express();
const cors = require('cors');
// app.use(cors());
const port = 3003;
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const role = require("./role");
const role_skill = require("./roleskill");

var allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

/////////////////////////////////////////////////////
///////////////////// TEST //////////////////////////

app.get('/', (req, res) => {
  res.send('Testing Hello World!')
})

/////////////////////////////////////////////////////
////////////// ROLE MICROSERVICE ////////////////////
/////////////////////////////////////////////////////

// THIS IS GET /role => TO GET ALL ROLES FOR FRONTEND
app.get('/listing', async (req, res) => {
    role.readAllListing()
  .then((results) => {
    // console.log("Results: ", results);
    const response = {
      statusCode: 200,
      body: results,
      message:"Retrieved Successfully"
    }
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    // console.error("Error: ", error);
    const response = {
      statusCode: 400,
      body: error,
      message:"Retrieval Unsuccessful"
    }
    console.log(response)
    res.status(400).send(response)
  });
})


// THIS IS GET /listing/:listingid? => TO GET ONE ROLE FOR FRONTEND
app.get('/listing/:listingid?', async (req, res) => {
    console.log(req.params.listingid)
    role.readOneListing(req.params.listingid)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message:"Retrieved Successfully"
      }
      console.log(response)
      res.status(200).send(response)
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message:"Retrieval Unsuccessful"
      }
      console.log(response)
      res.status(400).send(response)
    });
})

// THIS IS POST /listing => TO CREATE A ROLE
// {"listing_name":"ListName1","role_name":"RoleName1","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
app.post('/listing', async (req, res) => {
    console.log(req.body)
    role.createListing(req.body)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 201,
        body: results,
        message:"Posted Data Successfully"
      }
      console.log(response)
      res.status(201).send(response)
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message:"Post Unsuccessful"
      }
      console.log(response)
      res.status(400).send(response)
    });
})
/////////////////////////////////////////////////////
////////////// ROLE_SKILL MICROSERVICE //////////////
/////////////////////////////////////////////////////

app.get('/rs', async (req, res) => {
  role_skill.readAllRoleSkills()
  .then((results) => {
    // console.log("Results: ", results);
    const response = {
      statusCode: 200,
      body: results,
      message:"Retrieved Successfully"
    }
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    // console.error("Error: ", error);
    const response = {
      statusCode: 400,
      body: error,
      message:"Retrieval Unsuccessful"
    }
    console.log(response)
    res.status(400).send(response)
  });
})

app.get('/rs/:roleName?', async (req, res) => {
    console.log(req.params.roleName)
    role_skill.readSkillbyRole(req.params.roleName)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message:"Retrieved Successfully"
      }
      console.log(response)
      res.status(200).send(response)
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message:"Retrieval Unsuccessful"
      }
      console.log(response)
      res.status(400).send(response)
    });
})

/////////////////////////////////////////////////////
///////////////// STAFF MICROSERVICE ////////////////
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })