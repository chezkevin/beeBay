// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('connect-flash');
var path = require("path");
//Populate Items Database
require("./db/seeder.js");

// Include Authentication Strategies
require('./passport/passport');

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


//Sets up the viewing engine for the login code
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Sets the static folder
app.use(express.static("./views"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require('express-session')({ secret: 'n0d3castz secret cat key', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes =============================================================
require("./routes/passport-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
