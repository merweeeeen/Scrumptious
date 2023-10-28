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

async function getListingsApplied(staffid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * 
    FROM role.listing 
    WHERE listing_id IN (
      SELECT listing_id 
      FROM roles_application 
      WHERE staff_id = ${staffid}
    );
    `;
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

async function apply(staffid, listingid, writeup) {
  return new Promise((resolve, reject) => {
    // const query = `SELECT * FROM roles_application WHERE (listing_id = ${listingid});`;
    const query = `INSERT INTO role.roles_application (staff_id, listing_id, write_up) SELECT ${staffid}, ${listingid},'${writeup}' WHERE NOT EXISTS ( SELECT 1 FROM role.roles_application WHERE staff_id = ${staffid} AND listing_id = ${listingid});`;
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
  getApplicants,
  getListingsApplied,
  apply,
};
