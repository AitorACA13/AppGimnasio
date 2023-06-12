const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
  try {
    //Destructuring de los path params.
    const { userId, name, role } = req.params;

    const user = await selectUserByIdQuery(userId, name, role);
    //Si el usuario no existe, lanzamos un error...
    if (!user) {
      generateError('Usuario no encontrado.', 404);
    }
    //...y borramos el email que el usuario nos ha proporcionado.
    delete user.email;
    res.send({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
