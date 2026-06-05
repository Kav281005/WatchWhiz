// backend/WatchWhiz.x/middleware/isLoggedIn.js
module.exports = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // For API, send JSON error. For regular views, you might redirect instead.
  return res.status(401).json({ error: 'Unauthorized' });
};
