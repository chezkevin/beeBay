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
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/public/index.html"));
  });
  // after the user logs in, serve user's unique profile
  app.get("/:userId", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/user.html"));
  });
  // shows page that requires the user to login or register
  app.get("/:loginId", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });
  // shows all details of each individual item
  app.get("/:itemId", function(req, res){
    res.sendFile(path.join(__dirname + "/../public/item.html"));
  });
};
