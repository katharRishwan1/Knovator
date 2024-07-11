const passport = require('passport');

const authenticateJwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (!user) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
      }
      req.user = user; 
      next();
    })(req, res, next);
  };
  module.exports = authenticateJwt;
