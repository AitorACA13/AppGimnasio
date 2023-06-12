const getDB = require('../../getDB');

const infoExerciseQuery = async (idExercise) => {
  let connection;

  try {
    connection = await getDB();

    const [infoExercise] = await connection.query(
      `
        SELECT *
        FROM exercises
        WHERE id = ?
    `,
      [idExercise]
    );

    //Retornamos la información del ejercicio.
    return infoExercise[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = infoExerciseQuery;
