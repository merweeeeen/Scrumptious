const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "staff",
});

con.connect();

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

module.exports = { findStaffSkill };
