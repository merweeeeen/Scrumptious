const mysql = require("mysql");
require("dotenv").config();
function createConnection() {
  return mysql.createConnection({
    host: process.env["hostname"],
    user: process.env["user"],
    password: process.env["password"],
    database: "staff",
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
    const query =
      `SELECT * FROM staff_skill WHERE staff_id = '` + staffId + `';`;
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

function createSkillForStaff(skill) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO staff_skill (staff_id, skill_name) VALUES ("${skill.staffId}", "${skill.skillName}");`;
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

function deleteSkillForStaff(skill) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM staff_skill WHERE (staff_id = '${skill.staffId}') AND (skill_name = '${skill.skillName}');`;
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
  readAllStaffSkills,
  readSkillbyStaffId,
  createSkillForStaff,
  deleteSkillForStaff,
};
