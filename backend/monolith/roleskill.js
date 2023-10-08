
const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
    host: process.env["hostname"],
    user: process.env["user"],
    password: process.env["password"],
    database: "role",
  });

con.connect();


async function readAllRoleSkills() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM role_skill;`;
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

async function readSkillbyRole(roleName) {
return new Promise((resolve, reject) => {
    const query = `SELECT * FROM role_skill WHERE role_name = '`+ roleName + `';`;
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


  module.exports = { readAllRoleSkills, readSkillbyRole };
