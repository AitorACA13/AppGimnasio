const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    err.httpStatus = 400;
    throw err;
  }
};

module.export = validateSchema;
