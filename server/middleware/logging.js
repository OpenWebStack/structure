module.exports = function() {
  return function(req, res, next){
    if (req.url === '/') {
      console.log('yay middleware');
    }
    next();
  };
};