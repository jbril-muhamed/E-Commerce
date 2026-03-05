const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403);
  throw new Error('Not authorized as admin');
};

module.exports = { admin };
