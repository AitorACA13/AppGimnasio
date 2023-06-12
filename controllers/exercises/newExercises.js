'use strict';
const { generateError, savePhoto } = require('../../helpers');
const insertExerciseQuery = require('../../db/queries/exercises/insertExerciseQuery');
const newExercises = async (req, res, next) => {
  try {
    //Destructuring del body del request.
    const { name, description, typologyId, muscleGroupId } = req.body;
    //Si el admin no incluye alguno de los campos necesarios, lanzamos un error.
    if (!name || !description || !typologyId || !muscleGroupId) {
      generateError('Faltan campos para publicar el ejercicio.', 400);
    }

    //Creamos una variable que almacenará la foto.
    let photo;
    //Si hay una foto...
    if (req.files?.photo) {
      //...la guardamos y le asignamos un nombre con la función "savePhoto".
      photo = await savePhoto(req.files.photo, 500);
    }

    //Insertamos el ejercicio y obtenemos los datos.
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
