const getDB = require('../../getDB');

const modifyExerciseQuery = async (exerciseData) => {
  let connection;

  try {
    connection = await getDB();
    //Hacemos un destructuring de los datos del ejercicio.
    const { name, description, typologyId, muscleGroupId, photo, idExercise } =
      exerciseData;

    //Actualizamos los datos.
    await connection.query(
      `
        UPDATE exercises
        SET name = ?, description = ?, photo = ?, typologyId = ?, muscleGroupId = ?, modifiedAt =?
        WHERE id = ?
    `,
      [
        name,
        description,
        photo,
        typologyId,
        muscleGroupId,
        new Date(),
        idExercise,
      ]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modifyExerciseQuery;
