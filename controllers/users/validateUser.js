const updateUserRegCodeQuery = require('../../db/queries/users/updateUserRegCodeQuery');

const validateUser = async (req, res, next) => {
  try {
    //Obtenemos el codigo de registro a través de un destructuring de los path params.
    const { regCode } = req.params;

    //Activamos el usuario.
    await updateUserRegCodeQuery(regCode);
    res.send({
      status: 'ok',
      message: 'Usuario activado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = validateUser;
