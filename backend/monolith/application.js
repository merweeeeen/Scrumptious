const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "role",
});

con.connect();

async function getApplicants(listingid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM roles_application WHERE (listing_id = ${listingid});`;
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
    getApplicants
}
