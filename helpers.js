
'use strict';

const fs = require('fs/promises');
const path = require('path');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

=======

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};


/**
 * #####################
 * ## Validate Schema ##
 * #####################
 */

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
};

module.exports = {
  generateError,
  validateSchema,
};
