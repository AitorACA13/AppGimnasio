//insertNewUserQuery
const insertNewUserQuery = require('../../db/queries/users/insertUserQuery');

const { generateError } = require('../../helpers');
//newUser controller
const newUser = async (req, res, next) => {
  try {
    //Obtener name, email & password del body
    const { name, email, password } = req.body;

    //Check de campos requeridos
    if (!name || !email || !password) {
      generateError('Faltan campos', 400);
    }

    //Si el check es correcto, query para insertar newUser en DB
    await insertNewUserQuery(name, email, password);

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
