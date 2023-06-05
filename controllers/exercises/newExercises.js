'use strict';
const { generateError, savePhoto } = require('../../helpers');
const insertExerciseQuery = require('../../db/queries/exercises/insertExerciseQuery');
const newExercises = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      generateError('Solo el administrador puede crear ejercicios', 401);
    }
    //Estamos comprobando que el body sea correcto.
    const { name, description, typology, muscleGroup } = req.body;
    if (!name || !description || !typology || !muscleGroup) {
      generateError('Faltan campos para publicar el ejercicio.', 400);
    }
    //Insertamos el ejercicio y obtenemos los datos
    const exercise = await insertExerciseQuery(
      name,
      description,
      typology,
      muscleGroup,
      req.user.id
    );
    //Chequeamos req.files y creamos variable que almacena foto.
    const photos = [];
    if (req.files) {
      //Recorremos las fotos utilizando el metodo values para obtener los valores de la propiedad files
      // es decir las fotos. Para evitar que la array de fotos tenga mas de 3 fotos hacemos un slices,
      //y nos quedamos con las 3 primeras.
      for (const photo of Object.values(req.files).slice(0, 3)) {
        //Guardamos la photo en el disco.
        const photoName = await savePhoto(photo, 500);
        // Insertamos la foto y obtenemos los datos de la misma.
        const newPhoto = await insertPhotoQuery(photoName, exercise.id);
        //Pusheasmos la foto en el array de foto.
        photos.push(newPhoto);
      }
    }
    res.send({
      status: 'ok',
      data: {
        exercise: {
          ...exercise,
          photos,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = newExercises;
