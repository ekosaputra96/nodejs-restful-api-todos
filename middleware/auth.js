const wrapper = require("../utils/wrapper");

const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return wrapper.error(res, "Not Authorized", 401);
};

module.exports = {
  ensureAuthentication,
};
