'use strict';

const deleteFavouriteQuery = require('../../db/queries/exercises/deleteFavouriteQuery');

const deleteFavourite = async (req, res, next) => {
  try {
    const { id: idExercise } = req.params;
    await deleteFavouriteQuery(idExercise, req.user.id);
    res.send({
      status: 'ok',
      message: 'Favorito eliminado',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteFavourite;
