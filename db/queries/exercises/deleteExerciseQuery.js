const getDB = require('../../getDB');

const deleteExerciseQuery = async (idExercise) => {
  let connection;
  try {
    connection = await getDB();

    //Borramos primero los likes ya que dependen de los ejercicios.
    await connection.query(
      `
            DELETE
            FROM likes
            WHERE exerciseId = ?
        `,
      [idExercise]
    );
    //Después borramos los favoritos porque también dependen de los ejercicios.
    await connection.query(
      `
            DELETE
            FROM favourites
            WHERE exerciseId = ?
        `,
      [idExercise]
    );
    //Finalmente borramos el ejercicio.
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
