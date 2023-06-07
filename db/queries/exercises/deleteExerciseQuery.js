const getDB = require('../../getDB');

const deleteExerciseQuery = async (idExercise) => {
  let connection;
  try {
    connection = await getDB();

    //borramos primero los likes porque dependen los ejercicios
    await connection.query(
      `
            DELETE
            FROM likes
            WHERE exerciseId = ?
        `,
      [idExercise]
    );
    //borramos primero los favoritos porque dependen los ejercicios
    await connection.query(
      `
            DELETE
            FROM favourites
            WHERE exerciseId = ?
        `,
      [idExercise]
    );
    //finalmente borramos el ejercicio.
    await connection.query(
      `
          DELETE
          FROM exercises
          WHERE id = ?
      `,
      [idExercise]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExerciseQuery;
