'use strict';

const deleteLikeQuery = require('../../db/queries/exercises/deleteLikeQuery');

const deleteLike = async (req, res, next) => {
  try {
    //Destructuring del Id del ejercicio
    const { id: idExercise } = req.params;
    await deleteLikeQuery(idExercise, req.user.id);
    res.send({
      status: 'ok',
      message: 'Like eliminado',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteLike;
