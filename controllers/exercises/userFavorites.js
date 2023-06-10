const selectAllFavouritesQuery = require('../../db/queries/exercises/selectAllFavouritesQuery');
const { generateError } = require('../../helpers');
const userFavourites = async (req, res, next) => {
  try {
    const { id: idUser } = req.user;

    const { id } = req.params;

    /* if (idUser !== Number(id)) {
     generateError('No tienes permisos para ver estos favoritos.', 401);
    }  */

    const favs = await selectAllFavouritesQuery(idUser);

    res.send({
      status: 'ok',
      data: {
        exercises: favs,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = userFavourites;
