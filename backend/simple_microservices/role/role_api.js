const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const con = mysql.createConnection({
  host: process.env["hostname"],
  user: process.env["user"],
  password: process.env["password"],
  database: "role",
});

app.use(bodyParser.json());
con.connect();


app.get('/', (req, res) => {
  res.send('Testing Hello World!')
})

// THIS IS GET /ROLE => TO GET 
app.get('/role', async (req, res) => {
    // This is to check if email parameter contails anything
    console.log("Role MS successfully called")
    console.log(req.body)
    //{
    //   email: 'lixuen.low.2021@scis.smu.edu.sg',
    //   subject: 'test from FreeBee',
    //   message: 'This is a test from FreeBee!'
    // }
    // console.log(req.params)
    // console.log(req.params.email)
    function readAllRole() {
      const query = `SELECT * FROM role;`;
      con.query(query, function (error, results, fields) {
        console.log("results: " + results)
        if (error) throw error;
        res.send(results);
      });
    }
    readAllRole();
    // This is a sample of the returned result
    //[{"role_id":1,"role_name":"dsadsa","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1},
    // {"role_id":2,"role_name":"dsadsa","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1}]
})

app.get('/role/:roleid?', async (req, res) => {
  // This is to check if email parameter contails anything
  console.log("Role MS successfully called")
  console.log(req.body)
  //res.send(req.params.roleid) //params will return an object like this {roleid: 1}
  function readRole() {
    const roleId = req.params.roleid;
    const query = `SELECT * FROM role WHERE role_id = ${roleId};`;
    con.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  }
  readRole();
  // This is a sample of the returned result
  //[{"role_id":7,"role_name":"dsadsa","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1}]
})

app.post('/role', async (req, res) => {
  console.log(req.body)
  //res.send(req.body)
  //{"role_name":"TestName","dept":"asdas","country":"sg","num_openings":2,"expiry_date":"2023-07-04","open":1}
  //stonks it works
  function createRole(theBody) {
    const roleName = theBody.role_name;
    const dept = theBody.dept;
    const country = theBody.country;
    const numOpenings = theBody.num_openings;
    const expiryDate = theBody.expiry_date; // YYYY-MM-DD format
    const openVal = theBody.open;
    const query = `INSERT INTO role (role_name, dept, country, num_openings, expiry_date, open) VALUES ('${roleName}', '${dept}', '${country}', '${numOpenings}', '${expiryDate}', '${openVal}');`;
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
  // const content = JSON.parse(req.body);
  // console.log(content)
  // createRole(content);
  const msg = createRole(req.body);
  res.send(msg)
  //stonks it works
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})