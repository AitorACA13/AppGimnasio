const deleteUserQuery = require('../../db/queries/users/deleteUserQuery');
const { generateError } = require('../../helpers');

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteUserQuery(id);
    res.send({
      status: 'ok',
      message: `Usuario ${id} eliminado`,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteUser;
