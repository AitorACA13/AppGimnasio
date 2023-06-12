const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const getExercise = async (req, res, next) => {
  try {
    //Destructuring del Id del ejercicio
    const { id: exerciseId } = req.params;

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
