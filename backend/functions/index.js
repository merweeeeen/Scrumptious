const functions = require("firebase-functions");
const crud = require("./database/crud");

exports.crud = functions.https.onRequest(crud);
