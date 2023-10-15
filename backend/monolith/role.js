const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "role",
});

con.connect();

async function readAllListing() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM listing;`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

function readOneListing(listingid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM listing WHERE listing_id = ${listingid};`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

// POST, should take in an object like this: {"listing_name":"ListName1","role_name":"RoleName1","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
function createListing(theBody) {
  return new Promise((resolve, reject) => {
    const listingName = theBody.listing_name;
    const roleName = theBody.role_name;
    const dept = theBody.dept;
    const country = theBody.country;
    const numOpenings = theBody.num_openings;
    const expiryDate = theBody.expiry_date; // YYYY-MM-DD format
    const openVal = theBody.open;
    const currentdate = new Date();
    const datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    console.log(datetime); // YYYY-MM-DD HH:MI:SS format
    const desc = theBody.desc;
    const query = `INSERT INTO listing (listing_name, role_name, dept, country, num_openings, expiry_date, open, created_date, description) VALUES ('${listingName}','${roleName}', '${dept}', '${country}', '${numOpenings}', '${expiryDate}', '${openVal}', '${datetime}', '${desc}');`;
    con.query(query, function (error, results, fields) {
      if (error) {
        console.log("error: " + error);
        reject(error);
      } else {
        console.log("results: " + results);
        resolve(results);
      }
    });
  });
}

function readFavourite(staffid, listingid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM favourite WHERE listing_id = ${listingid} AND staff_id = ${staffid};`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

function postFavourite(staffid, listingid) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO favourite (staff_id,listing_id) VALUES ('${staffid}', ${listingid});`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

function removeFavourite(staffid, listingid) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM favourite WHERE staff_id = ${staffid} AND listing_id = ${listingid};`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

function deleteListing(listingId) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM listing WHERE (listing_id = '${listingId}')`;
    con.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        //   console.log("results: " + results)
        resolve(results);
      }
    });
  });
}

// createRoleListing({listing_name:"ListName1",role_id:1, role_name:"RoleName1",dept:"asdas",country:"sg",num_openings:2,expiry_date:"2023-07-04",open:1, desc:"desc1"})

module.exports = {
  readAllListing,
  readOneListing,
  createListing,
  readFavourite,
  postFavourite,
  removeFavourite,
  deleteListing,
};
