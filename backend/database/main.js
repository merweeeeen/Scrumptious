// This is just testing the crud.js calls 

const axios = require("axios");

async function readAllRole() {
  try {
    const response = await axios.get("http://localhost:3000/readAllRoles");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function readRole() {
  try {
    const response = await axios.get("http://localhost:3000/readRole", {
      params: {
        roleId: 1234,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

readRole();
