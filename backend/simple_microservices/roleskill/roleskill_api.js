const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const port = 3001;
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
  res.send('Testing Hello World! from role_skill_api')
})

app.get('/rs', async (req, res) => {
    // This is to check if email parameter contails anything
    console.log("RoleSkill MS successfully called")
    function readAllRoleSkill() {
      const query = `SELECT * FROM role_skill;`;
      con.query(query, function (error, results, fields) {
        console.log("results: " + results)
        if (error) throw error;
        res.send(results);
      });
    }
    readAllRoleSkill();
    // This is a sample of the returned result
    //[{"role_name":"RoleName1","skill_name":"SkillName1"},{"role_name":"RoleName1","skill_name":"SkillName2"},{"role_name":"RoleName1","skill_name":"SkillName3"},
    // {"role_name":"RoleName2","skill_name":"SkillName1"},{"role_name":"RoleName2","skill_name":"SkillName3"}]
})

app.get('/rs/:rolename?', async (req, res) => {
    // This is to check if email parameter contails anything
    console.log("RoleSkill MS successfully called")
    console.log(req.body)
    //res.send(req.params.rolename) //params will return an object like this {roleid: 1}
    function readRoleSkill() {
      const roleName = req.params.rolename;
      const query = `SELECT * FROM role_skill WHERE role_name = '`+ roleName + `';`;
      con.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
    readRoleSkill();
    // This is a sample of the returned result
    //[{"role_name":"RoleName1","skill_name":"SkillName1"},{"role_name":"RoleName1","skill_name":"SkillName2"},{"role_name":"RoleName1","skill_name":"SkillName3"}]
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })