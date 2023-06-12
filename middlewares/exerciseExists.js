'use strict';

const exerciseExistsQuery = require('../db/queries/exercises/exerciseExistsQuery');

//Comprobamos si existe el ejercicio en el DB
const exerciseExists = async (req, res, next) => {
  try {
    //Variable que almacena el id del ejercicio.
    const { id } = req.params;

    //Consulta del id del ejercicio a la DB.
    await exerciseExistsQuery(id);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = exerciseExists;
