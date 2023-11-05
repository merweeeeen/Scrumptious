const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "staff",
  connectTimeout: 60000, // Set the connection timeout to 60 seconds (adjust as needed)
});

con.connect();

function findStaff(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM staff WHERE staff_id = ${id};`;
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

function findStaffFromName(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM staff WHERE staff_FName LIKE '%${name}%' OR staff_LName LIKE '%${name}%';`;
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

function findStaffSkill(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM staff_skill WHERE staff_id = ${id};`;
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

  function listingApplicants(listingId){
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM staff.staff WHERE staff_id IN (SELECT staff_id FROM role.roles_application WHERE listing_id = ${listingId});`;
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

module.exports = { findStaff, findStaffFromName, findStaffSkill, listingApplicants };
