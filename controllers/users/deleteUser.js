const deleteUserQuery = require('../../db/queries/users/deleteUserQuery');

const deleteUser = async (req, res, next) => {
  try {
    //Obtemos el id del usuario que se va a borrar utilizando los path params.
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
