var db = require("../models");
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(result, done) {

  done(null, result);
});

passport.deserializeUser(function(result, done) {

  db.User.findOne({
    where:{
      id: result.id
    }
  }).then(function(result){
    done(false, result);
  })
});
