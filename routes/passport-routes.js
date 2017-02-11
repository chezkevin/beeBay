var passport = require("passport");

module.exports = function(app) {

  //Display Home Page
  app.get('/', function(req, res) {
    res.render('frontpage', {
      title: 'Your page title',
      message: '',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

  //Logout Route
  app.get('/logout', function(req, res) {
    res.render('frontpage', {
      title: 'Your page title',
      message: '',
      userName: undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

  //Receive Signin Form Data
  app.post('/signin',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
  });

  //Display Signup Form
  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'Your title',
      message: '',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });


  //Receive Signup Form Data
  app.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/signup' }),
    function(req, res) {
      res.redirect('/');
  });

}
