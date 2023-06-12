const selectAllExercisesQuery = require('../../db/queries/exercises/selectAllExercisesQuery');

const listExercises = async (req, res, next) => {
  try {
    //Destructuring de los campos especificados en el query. El usuario sólo puede filtrar por los primeros tres campos.
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
