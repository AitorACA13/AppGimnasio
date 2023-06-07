const deleteExerciseQuery = require('../../db/queries/exercises/deleteExerciseQuery');
const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const deleteExercise = async (req, res, next) => {
  try {
    const { id: idExercise } = req.params;

    await deleteExerciseQuery(idExercise);
    res.send({
      status: 'ok',
      message: 'Ejercicio eliminado',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteExercise;
