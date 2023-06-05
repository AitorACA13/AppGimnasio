const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
  try {
    const { userId, name, role } = req.params;
    const user = await selectUserByIdQuery(userId, name, role);
    if (!user) {
      generateError('Usuario no encontrado.', 404);
    }
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
