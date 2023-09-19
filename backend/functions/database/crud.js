const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const con = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "role",
});
const cors = require("cors");

app.use(cors(), bodyParser.json());
con.connect();

app.get("/", (req, res) => {
  const readAllRole = () => {
    const query = `SELECT * FROM role;`;
    con.query(query, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  };
  readAllRole();
});

app.get("/readAllRoles", (req, res) => {
  const readAllRole = () => {
    const query = `SELECT * FROM role;`;
    con.query(query, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  };
  readAllRole();
});

app.get("/readRole", (req, res) => {
  const params = req.query;
  console.log(params);
  const readRole = () => {
    const roleId = params.roleId;
    const query = `SELECT * FROM role WHERE role_id = ${roleId};`;
    con.query(query, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  };
  readRole();
});

// function createRole() {
//   const roleId = 1235;
//   const roleName = "smth";
//   const dept = "sth";
//   const country = "sth";
//   const numOpenings = "sth";
//   const expiryDate = "2023-07-04"; // YYYY-MM-DD format
//   const openVal = "1";
//   const query =
// eslint-disable-next-line max-len
// `INSERT INTO role (role_id, role_name, dept, country, num_openings, expiry_date, open) VALUES ('${roleId}', '${roleName}', '${dept}', '${country}', '${numOpenings}', '${expiryDate}', '${openVal}');`;
//   con.query(query, function (error, results, fields) {
//     if (error) throw error;
//     console.log("success");
//     return results;
//   });
// }

module.exports = app;
