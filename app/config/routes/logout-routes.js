module.exports = function(app) {
  /**
   * Display Home Pag
  **/
  app.get('/logout', function(req, res) {
    res.render('index', {
      title: 'Your page title',
      message: '',
      userName: undefined,
      flashMessage: req.flash('flashMessage')
    });
  });
}
