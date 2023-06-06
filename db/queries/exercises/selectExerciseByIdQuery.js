const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectExerciseByIdQuery = async (exerciseId, userId = 0) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el listado de ejercicios.
    const [exercises] = await connection.query(
      `
        SELECT 
                    E.id, 
                    E.description, 
                    E.photo, 
                    U.name,
                    E.userId = ? AS owner,
                    E.userId, 
                    E.createdAt
                FROM exercises E
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
        `,
      [userId, exerciseId]
    );
    //Si no hay un ejercicio lanzamos un error.
    if (exercises.length < 1) {
      generateError('Ejercicio no encontrado', 404);
    }

    //Dado que no puede existir más de un ejercicio con el mismo id, en caso de que en el array de ejercicios haya un ejercicio estará en la posición 0
    return exercises[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectExerciseByIdQuery;
