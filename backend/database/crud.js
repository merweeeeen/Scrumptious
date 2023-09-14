const mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env['user'],
  password: process.env["password"],
  database: "role",
});

con.connect();

function createRole() {
  const roleId = 1235;
  const roleName = "smth";
  const dept = "sth";
  const country = "sth";
  const numOpenings = "sth";
  const expiryDate = "2023-07-04"; // YYYY-MM-DD format
  const openVal = "1";
  const query = `INSERT INTO role (role_id, role_name, dept, country, num_openings, expiry_date, open) VALUES ('${roleId}', '${roleName}', '${dept}', '${country}', '${numOpenings}', '${expiryDate}', '${openVal}');`;
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("success");
    return results;
  });
}

async function readRole() {
  const query = `SELECT * FROM role;`;
  const response = con.query(query
    , function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    return results;
  }
  );
  console.log(response)
  return response.query
}

readRole()