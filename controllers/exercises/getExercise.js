const selectExerciseByIdQuery = require('../../db/queries/exercises/selectExerciseByIdQuery');

const getExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    //Dado que una persona que no este logueada podria ver la lista de ejercicios,
    const exercise = await selectExerciseByIdQuery(exerciseId);

    res.send({
      status: 'ok',
      data: {
        exercise,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getExercise;
