'use strict';

const addLikeQuery = require('../../db/queries/exercises/addLikeQuery');

const addLike = async (req, res, next) => {
  try {
    //Destructuring del Id del ejercicio
    const { id: idExercise } = req.params;

    await addLikeQuery(idExercise, req.user.id);

    res.send({
      status: 'ok',
      message: 'Like agregado',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = addLike;
