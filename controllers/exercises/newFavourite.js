const favouriteExerciseQuery = require('../../db/queries/exercises/favouriteExerciseQuery');
const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const { generateError } = require('../../helpers');

const newFavourite = async (req, res, next) => {
  try {
    const { id: idExercise } = req.params;
    const favourite = await favouriteExerciseQuery(idExercise, req.user.id);
  } catch (err) {
    next(err);
  }
};
module.exports = newFavourite;
