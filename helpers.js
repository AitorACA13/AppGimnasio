const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

module.export = {
  generateError,
};
