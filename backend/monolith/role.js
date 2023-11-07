const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "role",
  connectTimeout: 180000, // Set the connection timeout to 60 seconds (adjust as needed)
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

//PUT, should take in object like this: {"listing_name":"ListName1","role_name":"RoleName1","dept":"asdas","country":"msia","num_openings":2,"expiry_date":"2023-07-04","open":1, "desc":"desc1"}
function updateListing(theBody,listingid) {
  return new Promise((resolve, reject) => {
      const listingName = theBody.listing_name;
      const roleName = theBody.role_name;
      const dept = theBody.dept;
      const country = theBody.country;
      const numOpenings = theBody.num_openings;
      const expiryDate = theBody.expiry_date; // YYYY-MM-DD format
      const openVal = theBody.open;
      const desc = theBody.desc;
      const query =`UPDATE listing SET 
                    listing_name='${listingName}', 
                    role_name='${roleName}', 
                    dept='${dept}', 
                    country='${country}',
                    num_openings='${numOpenings}',
                    expiry_date='${expiryDate}',
                    open='${openVal}',
                    description='${desc}'
                    WHERE listing_id = ${listingid}`;

      con.query(query, function (error, results, fields) {
        if (error) {
            console.log("error: " + error)
            reject(error);
        } else {
            console.log("results: " + results)         
            resolve(results);
        }
      });
  })
}

// PUT, updates all listings that are expired to have open=0 from open=1
function updateExpiredListings(){
  return new Promise((resolve,reject) => {
    const closedstatus = 0;
    const openstatus = 1;
    const query = `UPDATE listing SET open=${closedstatus} WHERE expiry_date < current_date() AND open=${openstatus}`;
    
    con.query(query, function(error,results,fields) {
      if (error) {
        console.log("Error updating listings to closed");
        reject(error);
      } else {
        console.log(`Updated ${results.affectedRows} rows.`);
        resolve();
      }
    })
  })
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

// createRoleListing({listing_name:"ListName1",role_id:1, role_name:"RoleName1",dept:"asdas",country:"sg",num_openings:2,expiry_date:"2023-07-04",open:1, desc:"desc1"})

// createRoleListing({listing_name:"ListName1",role_id:1, role_name:"RoleName1",dept:"asdas",country:"sg",num_openings:2,expiry_date:"2023-07-04",open:1, desc:"desc1"})

function readFilteredListing(queryString) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM listing WHERE ${queryString};`;
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

function getFavouriteByStaffId(staffid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM listing WHERE listing_id IN (select listing_id from favourite WHERE staff_id = ${staffid});`;
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

module.exports = {
  readAllListing,
  readOneListing,
  createListing,
  updateListing,
  readFavourite,
  postFavourite,
  removeFavourite,
  deleteListing,
  readFilteredListing,
  getFavouriteByStaffId,
  updateExpiredListings
};
