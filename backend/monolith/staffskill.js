
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


async function readAllStaffSkills() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM staff_skill;`;
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

async function readSkillbyStaffId(staffId) {
return new Promise((resolve, reject) => {
    const query = `SELECT * FROM staff_skill WHERE staff_id = '`+ staffId + `';`;
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


  module.exports = { readAllStaffSkills, readSkillbyStaffId };
