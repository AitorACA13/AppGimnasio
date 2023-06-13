const updatePassQuery = require('../../db/queries/users/updatePassQuery');
const recoverPassUserSchema = require('../../schemas/recoverPassUserSchema');

const { generateError, validateSchema } = require('../../helpers');

const editUserPass = async (req, res, next) => {
  try {
    const { recoverPassCode, newPass } = req.body;

    //Validamos los datos del body con joi.
    await validateSchema(recoverPassUserSchema, req.body);

    if (!recoverPassCode || !newPass) {
      generateError('Faltan campos', 400);
    }

    // Insertamos al usuario en la base de datos.

    await updatePassQuery(recoverPassCode, newPass);

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserPass;
