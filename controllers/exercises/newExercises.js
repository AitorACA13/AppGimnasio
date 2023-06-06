'use strict';
const { generateError, savePhoto } = require('../../helpers');
const insertExerciseQuery = require('../../db/queries/exercises/insertExerciseQuery');
const newExercises = async (req, res, next) => {
  try {
    //Estamos comprobando que el body sea correcto.
    const { name, description, typologyId, muscleGroupId } = req.body;
    if (!name || !description || !typologyId || !muscleGroupId) {
      generateError('Faltan campos para publicar el ejercicio.', 400);
    }

    //Chequeamos req.files y creamos variable que almacena foto.
    let photo;

    if (req.files?.photo) {
      //Guardamos la photo en el disco y obtenemos su nombre.
      photo = await savePhoto(req.files.photo, 500);
    }

    //Insertamos el ejercicio y obtenemos los datos
    const exercise = await insertExerciseQuery(
      name,
      description,
      typologyId,
      muscleGroupId,
      photo,
      req.user.id
    );

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
module.exports = newExercises;
