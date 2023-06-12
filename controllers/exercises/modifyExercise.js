'use strict';
//Importamos los middlewares para guardar y borrar fotos, ya que en este request el usuario puede modificar su avatar.
const { generateError, savePhoto, deletePhoto } = require('../../helpers');

const modifyExerciseQuery = require('../../db/queries/exercises/modifyExerciseQuery');
const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const modifyExercise = async (req, res, next) => {
  try {
    //Destructuring del body
    let { name, description, typologyId, muscleGroupId } = req.body;

    //Si faltan campos generamos un error. El usuario no está obligado a subir una foto, por lo que ponemos un interrogante después de "req.files".
    if (
      !name &&
      !description &&
      !typologyId &&
      !muscleGroupId &&
      !req.files?.photo
    ) {
      generateError('Faltan campos', 400);
    }

    //Destructuring del path params
    const { id: idExercise } = req.params;

    const infoExercise = await infoExerciseQuery(idExercise);

    //Destructuring de las columnas de la tabla "exercises" que nos conciernen. Con "[columna]DB" establecemos que su valor inicial debe ser el que ya tiene en la tabla "exercises".
    const {
      name: nameDB,
      description: descriptionDB,
      photo: photoDB,
      typologyId: typologyDB,
      muscleGroupId: muscleGroupDB,
    } = infoExercise;

    //Comprobamos si el admin ha cambiado alguno de los datos. De no ser así, se retorna el dato que ya existía en la base de datos.
    name = name || nameDB;
    description = description || descriptionDB;
    typologyId = typologyId || typologyDB;
    muscleGroupId = muscleGroupId || muscleGroupDB;

    //Variable que almacenará la foto, si el admin decide subir una.
    let imgNameExercise;

    //Si el admin ha subido una foto...
    if (req.files?.photo) {
      //...borramos la anterior.
      await deletePhoto(photoDB);

      //Guardamos la imagen en la carpeta "uploads" y le asignamos un nombre con la función "savePhoto".
      imgNameExercise = await savePhoto(req.files.photo);
    }
    //Si el admin no ha subido una imagen, utilizar la que ya existía.
    imgNameExercise = imgNameExercise || photoDB;

    //Destructuring de los datos del ejercicio que modificaremos a continuación.
    const exerciseData = {
      name,
      description,
      typologyId,
      muscleGroupId,
      imgNameExercise,
      idExercise,
    };

    //Actualizamos los datos del ejercicio.
    await modifyExerciseQuery(exerciseData);
    //Mandamos un mensaje confirmando la correcta modificación de los datos del ejercicio. Asignamos un valor a la columna "modifiedAt".
    res.send({
      status: 'ok',
      message: `Ejercicio ${idExercise} modificado correctamente`,
      data: {
        exercise: {
          name,
          description,
          typologyId,
          muscleGroupId,
          modifiedAt: new Date(),
          photo: imgNameExercise,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyExercise;
