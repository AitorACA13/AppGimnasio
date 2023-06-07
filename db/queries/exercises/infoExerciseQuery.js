const getDB = require('../../getDB');

//queremos obtener informacion del ej de la dbs

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

    //return para tener toda la info sobre el ejercicio solicitado
    return infoExercise[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = infoExerciseQuery;
