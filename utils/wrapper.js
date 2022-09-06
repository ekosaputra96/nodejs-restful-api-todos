const success = (res, data, msg, code = 200) => {
  const result = res.status(code).json({
    success: true,
    data,
    msg,
    code,
  });
  return result;
};

const error = (res, msg, code = 400, data = null) => {
  const result = res.status(code).json({
    success: false,
    data,
    msg,
    code,
  });
  return result;
};

module.exports = {
  success,
  error,
};
