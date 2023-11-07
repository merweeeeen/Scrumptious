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
    // Handle the error as needed, and then reset the connection
    resetConnection();
  } else {
    console.log("Connected to the database");
  }
});

function resetConnection() {
  con.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    }
    con = createConnection();
    con.connect((err) => {
      if (err) {
        console.error("Error connecting to the database after reset:", err);
        // Handle the error, and you may choose to attempt the reset again
      } else {
        console.log("Connection reset and re-established successfully");
        // You can now use the new connection for queries
      }
    });
  });
}

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

function createStaff(details) {
  return new Promise((resolve, reject) => {
    const id = details.id;
    const fName = details.fName;
    const lName = details.lName;
    const dept = details.dept;
    const country = details.country;
    const email = details.email;
    const accessRights = details.accessRights;
    const password = details.password;
    const roleName = details.roleName;
    const query = `INSERT INTO staff (staff_id,staff_FName, staff_LName, dept, country, email, access_rights, password, role_name) VALUES ('${id}','${fName}','${lName}','${dept}','${country}','${email}','${accessRights}',"${password}",'${roleName}');`;
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

function deleteStaff(id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM staff WHERE staff_id = ${id};`;
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
function listingApplicants(listingId) {
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

module.exports = {
  findStaff,
  findStaffFromName,
  findStaffSkill,
  listingApplicants,
  createStaff,
  deleteStaff,
};
