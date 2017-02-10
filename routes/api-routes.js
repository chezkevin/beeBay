// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/items", function(req,res){
    db.Item.findAll({}).then(function(dbItems){
      res.json(dbItems);
    });
  });

  app.get("/api/items/:itemId", function(req,res){
    db.Item.findOne({
      where: {
        id: req.params.itemId
      },
      include: [db.User]
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  app.post("/api/items/bid/:itemId", function(req,res){
    console.log("req.body: ",req.body);
    db.Item.update({
      current_price: req.body.bid},
      {
        where:
        {
          id: req.params.itemId
        }
      }).then(function(dbItem) {
        console.log(dbItem);
        res.json(dbItem);
      });
    });

  app.get("/views/item/:id", function(req, res){
db.Item.find({
  where: {
    item_id: req.params.id
    }
  }).on('success', function (result) {

    if (result) {

      var currentViews = result.views;

      result.updateAttributes({
        views: currentViews++
      })
      .success(function () {

      res.json(this);
      });
    }
  });
});

  app.get("/api/user", function(req, res) {
  	db.User.findAll({
  	  include: [db.User]
  	}).then(function(dbUser) {
  	  res.json(dbUser);
  	});
  });

  app.get("/api/user/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
