// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

  // after the user logs in, serve user's unique profile
  app.get("/:username", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/user.html"));
  });
  // shows page that requires the user to login or register
  app.get("/:username", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });
  // shows all details of each individual item
  app.get("/:username", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/item.html"));
  });
};
