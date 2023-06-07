'use strict';

const exerciseExistsQuery = require('../db/queries/exercises/exerciseExistsQuery');

// comprobamos que existe el ejercicios en el DB
const exerciseExists = async (req, res, next) => {
  try {
    //variable que guarda el id del ejercicio
    const { id } = req.params;

    //consulta del id del ejercicio a la DB
    await exerciseExistsQuery(id);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = exerciseExists;
