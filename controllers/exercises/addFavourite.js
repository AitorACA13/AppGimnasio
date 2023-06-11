'use strict';

const addFavouriteQuery = require('../../db/queries/exercises/addFavouriteQuery');

const addFavourite = async (req, res, next) => {
  try {
    //Destructuring del Id del ejercicio
    const { id: idExercise } = req.params;

    await addFavouriteQuery(idExercise, req.user.id);

    res.send({
      status: 'ok',
      message: 'Añadido a favorito',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = addFavourite;
