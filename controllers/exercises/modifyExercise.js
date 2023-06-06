const selectExerciseByIdQuery = require('../../db/queries/exercises/selectExerciseByIdQuery');

const updateExerciseQuery = require('../../db/queries/exercises/updateExerciseQuery');

const { generateError } = require('../../helpers');

const modifyExercise = async (req, res, next) => {
  try {
    let { name, description, typologyId, muscleGroupId, photo } = req.body;

    if (!name && !description && !typologyId && !muscleGroupId) {
      generateError('Faltan campos', 400);
    }

    const exercise = await selectExerciseByIdQuery(req.exerciseId);

    name = name || exercise.name;
    description = description || exercise.description;
    typologyId = typologyId || exercise.typologyId;
    muscleGroupId = muscleGroupId || exercise.muscleGroupId;
    photo = photo || exercise.photo;

    await updateExerciseQuery(
      name,
      description,
      typologyId,
      muscleGroupId,
      photo,
      req.exercise.id
    );
    res.send({
      status: 'ok',
      msg: 'Ejercicio actualizado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = modifyExercise;
