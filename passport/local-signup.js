var db = require("../models");
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');

module.exports = function(salt) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done) {

    db.User.findOne({
      where:{
        username : username
      }
    }).then(function(result){
      if (result){
        return done(null, false, req.flash('flashMessage', 'Sorry! That username is already taken.'));
      }
      else{
        db.User.findOne({
          where:{
            email: req.body.email
          }
        }).then(function(result){
          if (result){
            return done(null, false, req.flash('flashMessage', 'Sorry! That email is already taken.'));
          }
          else{
            db.User.create({
              name: req.body.name,
              username: username,
              email: req.body.email,
              password: bcrypt.hashSync(password, salt)
            });
            return done(null, User);
          }
        })
      }
    })
  }));

}
