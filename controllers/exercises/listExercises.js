const selectAllExercisesQuery = require('../../db/queries/exercises/selectAllExercisesQuery');

const listExercises = async (req, res, next) => {
  try {
    const { keyword, typology, muscleGroup, date } = req.query;
    const exercises = await selectAllExercisesQuery(
      keyword,
      typology,
      muscleGroup,
      date,
      req.user.id
    );

    res.send({
      status: 'ok',
      data: {
        exercises,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listExercises;
