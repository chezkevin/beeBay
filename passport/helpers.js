var db = require("../models");
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.Users.findOne({
    where:{
      id: id
    }
  }).then(function(result){
    done(rows[0]);
  })
});
