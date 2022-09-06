const wrapper = require("../utils/wrapper");

const errorHandling = (err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  const msg = err.message;
  let data = null;
  if (process.env.NODE_ENV !== "production") {
    data = err.stack;
  }
  return wrapper.error(res, msg, statusCode, data);
};

module.exports = errorHandling;
