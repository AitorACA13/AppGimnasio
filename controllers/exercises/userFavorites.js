const selectAllFavouritesQuery = require('../../db/queries/exercises/selectAllFavouritesQuery');

const userFavourites = async (req, res, next) => {
  try {
    //Destructuring del Id del usuario.
    const { id: idUser } = req.user;
    //Path params del usuario.
    const { id } = req.params;

    //Seleccionamos los ejercicios del usuario logueado.
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
