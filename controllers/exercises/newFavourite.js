const favouriteExerciseQuery = require('../../db/queries/exercises/addFavouriteQuery');

const newFavourite = async (req, res, next) => {
  try {
    //Destructing del Id del ejercicio.
    const { id: idExercise } = req.params;
    await favouriteExerciseQuery(idExercise, req.user.id);
  } catch (err) {
    next(err);
  }
};
module.exports = newFavourite;
