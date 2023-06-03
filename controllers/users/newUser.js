const { generateError } = require('../../helpers');
const insertUserQuery = require('../../src/models/users/insertUserQuery');
const newUserSchema = require('../../src/schemas/newUserSchema');
const validateSchema = require('../../src/schemas/validateSchema');
const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      generateError('Faltan campos', 400);
    }
    await validateSchema(newUserSchema, req.body);
    await insertUserQuery(name, email, password);
    res.send({
      status: 'ok',
      msg: 'Usuario creado',
    });
  } catch (err) {
    next(err);
  }
};

module.export = newUser;
