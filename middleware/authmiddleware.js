const mockUser = {
  id: "1",
  name: "Admin User",
  role: "viewer" // change to viewer / analyst to test
};

const attachUser = (req, res, next) => {
  req.user = mockUser;
  next();
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { attachUser, checkRole };