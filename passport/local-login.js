var db = require("../models");
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');

module.exports = function(salt) {

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    db.User.findOne({
      where:{
        email: email
      }
    }).then(function(result){
      if (result == undefined){
        return done(null, false, req.flash('flashMessage', 'Invalid login details'));
      }
      if (bcrypt.hashSync(password, salt) !== result.password) {
        return done(null, false, req.flash('flashMessage', 'Invalid login details'));
      }

      return done(null, result);
    })
  }));
}
