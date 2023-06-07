const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const getExercise = async (req, res, next) => {
  try {
    const { id: exerciseId } = req.params;

    //dado que una persona que no este logueada podria ver la lista de ejercicios,
    const exercise = await infoExerciseQuery(exerciseId);

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
