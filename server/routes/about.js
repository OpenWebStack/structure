/*
 * Expose the about page
 */
module.exports.index = function() {
  return function index(req, res, next) {
    res.send('<h1>About '+ app.get('info').name +'</h1>');
  };
};
