//insertNewUserQuery
const insertUserQuery = require('../../db/queries/users/insertUserQuery');
const newUserSchema = require('../../schemas/newUserSchema');

const { generateError, validateSchema } = require('../../helpers');
//newUser controller
const newUser = async (req, res, next) => {
  try {
    //Obtener name, email & password del body
    const { name, email, password } = req.body;

    //Check de campos requeridos
    if (!name || !email || !password) {
      generateError('Faltan campos', 400);
    }
    await validateSchema(newUserSchema, req.body);
    //Si el check es correcto, query para insertar newUser en DB
    await insertUserQuery(name, email, password);

    //response
    res.send({
      status: 'ok',
      message: `Hola ${name}, tu usuario se ha creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newUser;
