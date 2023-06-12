const deleteExerciseQuery = require('../../db/queries/exercises/deleteExerciseQuery');

const deleteExercise = async (req, res, next) => {
  try {
    //Destructuring del Id del ejercicio
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
