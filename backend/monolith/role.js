
const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
    host: process.env["hostname"],
    user: process.env["user"],
    password: process.env["password"],
    database: "role",
  });

con.connect();

// async function readAllRole() {
//     const query = `SELECT * FROM listing;`;
//     con.query(query, function (error, results, fields) {
//       console.log("results: " + results)
//       if (error) throw error;
//       return(results);
//     });
//   }

async function readAllRole() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM listing;`;
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

function readOneRole(listingid) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM listing WHERE role_id = ${listingid};`;
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

// POST, should take in an object like this: {"role_name":"TestName","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1}
function createRole(theBody) {
    const roleName = theBody.role_name;
    const dept = theBody.dept;
    const country = theBody.country;
    const numOpenings = theBody.num_openings;
    const expiryDate = theBody.expiry_date; // YYYY-MM-DD format
    const openVal = theBody.open;
    const currentdate = new Date(); 
    const datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    console.log(datetime)
    // YYYY-MM-DD HH:MI:SS format
    const query = `INSERT INTO role (role_name, dept, country, num_openings, expiry_date, open, created_date) VALUES ('${roleName}', '${dept}', '${country}', '${numOpenings}', '${expiryDate}', '${openVal}', '${datetime}');`;
    con.query(query, function (error, results, fields) {
      if (error) throw error;
      console.log("success");
      console.log(results)
      // OkPacket {
      //   fieldCount: 0,
      //   affectedRows: 1,
      //   insertId: 10,
      //   serverStatus: 2,
      //   warningCount: 0,
      //   message: '',
      //   protocol41: true,
      //   changedRows: 0
      // }
      return results;
    });
  }

  module.exports = { readAllRole, readOneRole, createRole };