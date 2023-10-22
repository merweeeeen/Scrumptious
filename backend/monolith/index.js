const express = require("express");
const app = express();
const cors = require("cors");
// app.use(cors());
const port = 3003;
const bodyParser = require("body-parser");
// app.use(bodyParser.json());

const role = require("./role");
const role_skill = require("./roleskill");
const staff_skill = require("./staffskill");
const staffClass = require("./StaffClass");
const listingClass = require("./rolelisting");
const staff = require("./Staff");
const favourite = require("./Favourite");
const application = require("./application");
const ApplicantClass = require("./ApplicationClass");
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
app.get("/listing", async (req, res) => {
  console.log("GET /listing started");
  role
    .readAllListing()
    .then(async (results) => {
      let body = [];
      for (let result of results) {
        // const applicants = await application.getApplicants(result.listing_id);
        // const numberOfApplicants = applicants.length;

        // body.push(
        //   new listingClass.RoleListing(
        //     result.listing_id,
        //     result.listing_name,
        //     result.role_name,
        //     result.dept,
        //     result.country,
        //     result.num_openings,
        //     result.expiry_date,
        //     result.open,
        //     result.description,
        //     result.created_date,
        //     numberOfApplicants,
        //     await role_skill.readSkillbyRole(result.role_name)
        //   )
        // );

        
        let thisListing =  new listingClass.RoleListing(
            result.listing_id,
            result.listing_name,
            result.role_name,
            result.dept,
            result.country,
            result.num_openings,
            result.expiry_date,
            result.open,
            result.description,
            result.created_date,
            // numberOfApplicants,
            await role_skill.readSkillbyRole(result.role_name)
          );
        body.push(thisListing);
        await thisListing.updateApplicants();
      }
      const response = {
        statusCode: 200,
        body: body,
        message: "Retrieved Successfully",
      };
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
  console.log("GET /listing/:listingId started");
  const applicants = await application.getApplicants(req.params.listingid);
  const numberOfApplicants = applicants.length;
  role
    .readOneListing(req.params.listingid)
    .then(async (results) => {
      const returnListingClass = new listingClass.RoleListing(
        results[0].listing_id,
        results[0].listing_name,
        results[0].role_name,
        results[0].dept,
        results[0].country,
        results[0].num_openings,
        results[0].expiry_date,
        results[0].open,
        results[0].description,
        results[0].created_date,
        numberOfApplicants,
        await role_skill.readSkillbyRole(results[0].role_name)
      );
      const response = {
        statusCode: 200,
        body: returnListingClass,
        message: "Retrieved Successfully",
      };
      res.status(200).send(response);
      console.log("GET /listing/:listingId ended");
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
  console.log("POST /listing started"); // This is to check if email parameter contails anything
  role
    .createListing(req.body)
    .then((results) => {
      const response = {
        statusCode: 201,
        body: results,
        message: "Posted Data Successfully",
      };
      res.status(201).send(response);
      console.log("POST /listing ended");
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

app.get("/listing/filter/:filter", async (req, res) => {
  try {
    const filter = JSON.parse(req.params.filter);
    const filterKey = Object.keys(filter);
    var filterString = "";
    for (let key of filterKey) {
      if (key === "skills") {
        // find role that has the skills needed
        const results = await role_skill.readRolebySkill(filter[key]);
        let roleString = "";
        for (let result of results) {
          if (roleString === "") {
            roleString += `role_name = '${result.role_name}'`;
          } else {
            roleString += ` OR role_name = '${result.role_name}'`;
          }
        }
        if (filterString === "") {
          filterString += `(${roleString})`;
        } else {
          filterString += `AND (${roleString})`;
        }
      } else {
        if (filterString === "") {
          filterString += `${key} = "${filter[key]}"`;
        } else {
          filterString += `AND ${key} = "${filter[key]}"`;
        }
      }
    }
    const filteredResults = await role.readFilteredListing(filterString);
    let responseArray = [];
    for (let result of filteredResults) {
      responseArray.push(
        new listingClass.RoleListing(
          result.listing_id,
          result.listing_name,
          result.role_name,
          result.dept,
          result.country,
          result.num_openings,
          result.expiry_date,
          result.open,
          result.description,
          result.created_date
        )
      );
    }
    const response = {
      statusCode: 200,
      body: responseArray,
      message: "Data Filtered Successfully",
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      statusCode: 200,
      message: "Data Filtered Unsuccesfully",
    };
    res.status(400).send(response);
  }
});
/////////////////////////////////////////////////////
////////////// ROLE_SKILL MICROSERVICE //////////////
/////////////////////////////////////////////////////

app.get("/rs", async (req, res) => {
  console.log("GET /rs started");
  role_skill
    .readAllRoleSkills()
    .then((results) => {
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      res.status(200).send(response);
      console.log("GET /rs ended");
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
  console.log("GET /rs/:roleName started");
  role_skill
    .readSkillbyRole(req.params.roleName)
    .then((results) => {
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
      res.status(200).send(response);
      console.log("GET /rs/:roleName ended");
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
  console.log("GET /login started");
  staff
    .findStaff(req.params.staffId)
    .then((results) => {
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
      staff.findStaffSkill(req.params.staffId).then( async (staffSkills) => {
        const skills = staffSkills.map((staffSkill) => {
          return staffSkill.skill_name;
        });
        const returnStaffClass = new staffClass.Staff(
          results[0].staff_id,
          results[0].staff_FName,
          results[0].staff_LName,
          results[0].dept,
          results[0].country,
          results[0].email,
          req.params.access,
          skills,
          results[0].password
        );
        await returnStaffClass.updateApplications()
        console.log(returnStaffClass)
        const response = {
          statusCode: 200,
          body: returnStaffClass,
          message: "Retrieved Successfully",
        };
        res.status(200).send(response);
        console.log("GET /login ended");
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
////////////// STAFF_SKILL MICROSERVICE /////////////
/////////////////////////////////////////////////////

app.get("/ss", async (req, res) => {
  staff_skill
    .readAllStaffSkills()
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
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

app.get("/ss/:staffId?", async (req, res) => {
  staff_skill
    .readSkillbyStaffId(req.params.staffId)
    .then((results) => {
      // console.log("Results: ", results);
      const response = {
        statusCode: 200,
        body: results,
        message: "Retrieved Successfully",
      };
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

/* 
Favourite
To utilise Favourite Class, you can run the code as "const favouriteClass = response.data.body"
To get the staffid use favouriteClass._staffId
To get the listingid use favouriteClass._listingId
*/
app.get("/favourite/read/:staffid/:listingid", async (req, res) => {
  try {
    console.log("GET /favourite/read started");
    role
      .readFavourite(req.params.staffid, req.params.listingid)
      .then((result) => {
        if (result.length === 0) {
          res.status(200).send({ status: 200, message: "Not Favourited" });
        } else {
          const favouriteClass = new favourite.Favourite(
            req.params.staffid,
            req.params.listingid
          );
          res
            .status(200)
            .send({ status: 200, message: "Favourited", body: favouriteClass });
        }
        console.log("GET /favourite/read ended");
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: "Reading Favourite Failed" });
  }
});

/* Add and Post would require the frontend to parse in in this format 
"axios.post("url",{staffid: [input staffid], listingid: [input listingid]})" 
"axios.delete("url",{data: {staffid: [input staffid], listingid: [input listingid]}})" respectively
*/

app.post("/favourite/add", async (req, res) => {
  try {
    console.log("POST /favourite/add started");
    const staffid = req.body.staffid;
    const listingid = req.body.listingid;
    const favouriteClass = new favourite.Favourite(staffid, listingid);
    const response = await favouriteClass.addFavourite(staffid, listingid);
    if (response.error === "ER_DUP_ENTRY") {
      res.status(200).send({ status: 200, message: "Already Favourited" });
      return;
    }
    res.status(200).send({ status: 200, message: "Favourited" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: "Favouriting Failed" });
  }
});

app.post("/favourite/remove", async (req, res) => {
  try {
    console.log("POST /favourite/remove started");
    const staffid = req.body.staffid;
    const listingid = req.body.listingid;
    const favouriteClass = new favourite.Favourite(staffid, listingid);
    await favouriteClass.deleteFavourite(staffid, listingid);
    res.status(200).send({ status: 200, message: "Unfavourited" });
    console.log("POST /favourite/remove ended");
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: "Unfavouriting Failed" });
  }
});

// app.get("/application/:listingId", async (req, res) => {
//   try {
//     console.log("GET /application started");
//     const listingid = req.params.listingId;
//     const response = await application.getApplicants(listingid);
//     res
//       .status(200)
//       .send({ status: 200, body: response, message: "Applicants Retrieved" });
//     console.log("GET /application ended");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ status: 400, message: "Retrieval Failed" });
//   }
// });

app.delete("/delete/listing/:listingId", async (req, res) => {
  const listingName = req.params.listingId;
  role
    .deleteListing(listingName)
    .then((results) => {
      const response = {
        statusCode: 200,
        body: results,
        message: "Deleted Successfully",
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      const response = {
        statusCode: 400,
        body: error,
        message: "Deletion Unsuccessful",
      };
      res.status(400).send(response);
    });
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


app.get("/application/:listingId", async (req, res) =>{
  try{
    console.log('GET /application started')
    const listingid = req.params.listingId;
    const response = await application.getApplicants(listingid);
    let applicantsArray = [];
    for (let application of response){
      applicantsArray.push(
        new ApplicantClass.Applicant(
          application.staff_id,
          application.listing_id,
          application.write_up
        )
      )
    }
    res.status(200).send({status: 200, body: applicantsArray, message: "Applicants Retrieved"})
    console.log('GET /application ended')
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: "Retrieval Failed" });
  }
})

app.post("/application", async (req, res) =>{
  try{
    console.log('POST /application started')
    const listingid = req.body.listingId;
    const staffid = req.body.staffId
    const writeup = req.body.writeUp
    const response = await application.apply(staffid, listingid, writeup);
    res.status(200).send({status: 200, body: response, message: "Applicants Retrieved"})
    console.log('POST /application ended')
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: "POST Failed" });
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
