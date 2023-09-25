const express = require("express");

const app = express();
const port = 3003;
const bodyParser = require("body-parser");


app.use(bodyParser.json());

const role = require("./role");


app.get('/', (req, res) => {
  res.send('Testing Hello World!')
})

app.get('/role', async (req, res) => {
    role.readAllRole()
  .then((results) => {
    console.log("Results: ", results);
    res.send(results)
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
    // console.log("printing results from calling the thing" + response)
    // res.send(results)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })