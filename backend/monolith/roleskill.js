const mysql = require("mysql");
require("dotenv").config();
function createConnection() {
  return mysql.createConnection({
    host: process.env["hostname"],
    user: process.env["user"],
    password: process.env["password"],
    database: "role",
    connectTimeout: 600000
  });
}

let con = createConnection();

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  }
});

// Register an error event handler on the connection
con.on("error", (err) => {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Connection was lost. Reconnecting...");
    resetConnection();
  } else {
    console.error("Database connection error:", err);
  }
});

function resetConnection() {
  con = createConnection();
  con.connect((err) => {
    if (err) {
      console.error("Error reconnecting to the database:", err);
      // Handle the error, and you may choose to attempt the reset again
    } else {
      console.log("Connection reset and re-established successfully");
      // You can now use the new connection for queries
    }
  });
}

function readAllRoleSkills() {
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

function readSkillbyRole(roleName) {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT * FROM role_skill WHERE role_name = '` + roleName + `';`;
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

function readRolebySkill(skill) {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT * FROM role_skill WHERE skill_name = "${skill}";`;
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

module.exports = { readAllRoleSkills, readSkillbyRole, readRolebySkill };
