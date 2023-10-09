const express = require("express");
const app = express();
const cors = require("cors");
// app.use(cors());
const port = 3003;
const bodyParser = require("body-parser");
// app.use(bodyParser.json());

const role = require("./role");
const role_skill = require("./roleskill");
const staffClass = require("./StaffClass");
const staff = require("./Staff");
// const e = require("express");

var allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
  bodyParser.json()
);

/////////////////////////////////////////////////////
///////////////////// TEST //////////////////////////

app.get("/", (req, res) => {
  res.send("Testing Hello World!");
});

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

// THIS IS PUT /listing => TO update A ROLE
// {"listing_name":"ListName1","role_name":"RoleName1","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
app.put('/listing/:listingid?', async (req, res) => {
  console.log(req.body)
  console.log(req.params.listingid)
  role.updateRoleListing(req.body, req.params.listingid)
  .then((results) => {
      console.log("Results: ", results);
      res.status(201).send("Update Successful");
      // res.send(results)
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
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "Retrieval Unsuccessful",
      };
      console.log(response);
      res.status(400).send(response);
    });
});

// THIS IS GET /listing/:listingid? => TO GET ONE ROLE FOR FRONTEND
app.get("/listing/:listingid?", async (req, res) => {
  console.log(req.params.listingid);
  role
    .readOneListing(req.params.listingid)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "Retrieval Unsuccessful",
      };
      console.log(response);
      res.status(400).send(response);
    });
});

// THIS IS POST /listing => TO CREATE A ROLE
// {"listing_name":"ListName1","role_name":"RoleName1","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
app.post("/listing", async (req, res) => {
  console.log("POST /listing called"); // This is to check if email parameter contails anything
  console.log(req.body);
  // if (req.body !== {}){
  // console.log("Body found")
  role
    .createListing(req.body)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 201,
        body: results,
        message: "Posted Data Successfully",
      };
      console.log(response);
      res.status(201).send(response);
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "Post Unsuccessful",
      };
      console.log(response);
      res.status(400).send(response);
    });
  // }
  // else{ console.log("No body found")}
});
/////////////////////////////////////////////////////
////////////// ROLE_SKILL MICROSERVICE //////////////
/////////////////////////////////////////////////////

app.get("/rs", async (req, res) => {
  role_skill
    .readAllRoleSkills()
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "Retrieval Unsuccessful",
      };
      console.log(response);
      res.status(400).send(response);
    });
});

app.get("/rs/:roleName?", async (req, res) => {
  console.log(req.params.roleName);
  role_skill
    .readSkillbyRole(req.params.roleName)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "Retrieval Unsuccessful",
      };
      console.log(response);
      res.status(400).send(response);
    });
});

/////////////////////////////////////////////////////
///////////////// STAFF MICROSERVICE ////////////////
/////////////////////////////////////////////////////

// THIS IS GET /role => TO GET ALL Staff FOR FRONTEND
app.get("/login/:staffId/:password/:access", async (req, res) => {
  staff
    .findStaff(req.params.staffId)
    .then((results) => {
      // console.log("Results: ", results);
      if (results[0].password !== req.params.password) {
        const response = {
          statusCode: 200,
          message: "Wrong Password",
        };
        res.send(response);
        return;
      }
      if (results[0].access_rights < req.params.access) {
        const response = {
          statusCode: 200,
          message: "Invalid Access",
        };
        res.send(response);
        return;
      }
      staff.findStaffSkill(req.params.staffId).then((staffSkills) => {
        const skills = staffSkills.map((staffSkill) => {
          return staffSkill.skill_name;
        });
        const returnStaffClass = new staffClass.Staff(
          results[0].staff_id,
          results[0].staff_fname,
          results[0].staff_lname,
          results[0].dept,
          results[0].country,
          results[0].email,
          results[0].access_rights,
          skills,
          results[0].password
        );
        const response = {
          statusCode: 200,
          body: returnStaffClass,
          message: "Retrieved Successfully",
        };
        res.status(200).send(response);
        return;

      });
    })
    .catch((error) => {
      // console.error("Error: ", error);
      const response = {
        statusCode: 400,
        body: error,
        message: "StaffID not found",
      };
      res.status(400).send(response);
    });
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
