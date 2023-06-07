'use strict';

const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const modifyExerciseQuery = require('../../db/queries/exercises/modifyExerciseQuery');
const infoExerciseQuery = require('../../db/queries/exercises/infoExerciseQuery');

const modifyExercise = async (req, res, next) => {
  try {
    //destructuring del body
    let { name, description, typologyId, muscleGroupId } = req.body;

    //si faltan campos generamos un error
    if (
      !name &&
      !description &&
      !typologyId &&
      !muscleGroupId &&
      !req.files?.photo
    ) {
      generateError('Faltan campos', 400);
    }

    //destructuring del path params
    const { id: idExercise } = req.params;

    //cogemos toda la info del ejercicio de la DB
    const infoExercise = await infoExerciseQuery(idExercise);

    //destructuring de la info del ejercicio de DB
    const {
      name: nameDB,
      description: descriptionDB,
      photo: photoDB,
      typologyId: typologyDB,
      muscleGroupId: muscleGroupDB,
    } = infoExercise;

    //comprobamos de contenido. Si no se modifica se asigna el valor de la DB
    name = name || nameDB;
    description = description || descriptionDB;
    typologyId = typologyId || typologyDB;
    muscleGroupId = muscleGroupId || muscleGroupDB;

    //MANEJO DE LA FOTO
    //variable que almacenara foto
    let imgNameExercise;

    //checkamos si existe una imagen
    if (req.files?.photo) {
      //y borramos la foto anterior si existe una nueva
      await deletePhoto(photoDB);

      //guardamos de la imagen en uploads y obtenemos del nombre con funcion savePhoto.
      imgNameExercise = await savePhoto(req.files.photo);
    }

    imgNameExercise = imgNameExercise || photoDB;

    //bbjeto como parametro
    const exerciseData = {
      name,
      description,
      typologyId,
      muscleGroupId,
      imgNameExercise,
      idExercise,
    };

    // actualizamos datos del ejercicio
    await modifyExerciseQuery(exerciseData);

    res.send({
      status: 'ok',
      message: `Ejercicio ${idExercise} modificado correctamente`,
      data: {
        exercise: {
          name,
          description,
          typologyId,
          muscleGroupId,
          photo: imgNameExercise,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyExercise;
