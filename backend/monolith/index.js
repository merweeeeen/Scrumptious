const express = require("express");
const app = express();
const port = 3003;
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const role = require("./role");


/////////////////////////////////////////////////////
///////////////////// TEST //////////////////////////

app.get('/', (req, res) => {
  res.send('Testing Hello World!')
})

/////////////////////////////////////////////////////
////////////// ROLE MICROSERVICE ////////////////////
/////////////////////////////////////////////////////

// THIS IS GET /role => TO GET ALL ROLES FOR FRONTEND
app.get('/role', async (req, res) => {
    role.readAllRole()
  .then((results) => {
    console.log("Results: ", results);
    res.send(results)
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
    // console.log("printing results from calling the thing" + response)
    // res.send(results)
})

// THIS IS GET /role/:roleid? => TO GET ONE ROLE FOR FRONTEND
app.get('/role/:roleid?', async (req, res) => {
    console.log(req.params.roleid)
    role.readOneRole(req.params.roleid)
  .then((results) => {
    console.log("Results: ", results);
    res.send(results)
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
})

// THIS IS GET /listing/:listingid? => TO GET ONE ROLE FOR FRONTEND
app.get('/listing/:listingid?', async (req, res) => {
    console.log(req.params.listingid)
    role.readOneListing(req.params.listingid)
  .then((results) => {
    console.log("Results: ", results);
    res.send(results)
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
})

// THIS IS POST /listing => TO CREATE A ROLE
// {"listing_name":"ListName1","role_id":1,"role_name":"RoleName1","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
app.post('/listing', async (req, res) => {
    console.log(req.body)
    role.createRoleListing(req.body)
    .then((results) => {
        console.log("Results: ", results);
        res.send(results)
    })
    .catch((error) => {
        console.error("Error: ", error);
    });
})
/////////////////////////////////////////////////////
////////////// ROLE_SKILL MICROSERVICE //////////////
/////////////////////////////////////////////////////



/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })