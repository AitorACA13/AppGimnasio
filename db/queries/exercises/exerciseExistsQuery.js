'use strict';

const { generateError } = require('../../../helpers');
const getDB = require('../../getDB');

const exerciseExistsQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getDB();

    const [exercise] = await connection.query(
      `
        SELECT id
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );

    //Si el ejercicio no existe, lanzamos un error.
    if (exercise.length === 0) {
      generateError(`El ejercicio ${idExercise} no existe`, 404);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = exerciseExistsQuery;
