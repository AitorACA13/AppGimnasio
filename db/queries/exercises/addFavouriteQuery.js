const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const addFavouriteQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    const [favourites] = await connection.query(
      `SELECT id FROM favourites WHERE exerciseId =? AND userId=?`,
      [idExercise, userId]
    );
    //Lanzamos un error si el usuario ya ha añadido el ejercicio a sus favoritos.
    if (favourites.length > 0) {
      generateError(
        'No puedes añadir a favoritos dos veces al mismo ejercicio',
        403
      );
    }
    //Insertamos los valores necesarios en la tabla "favourites" para añadir el ejercicio a favoritos.
    await connection.query(
      `INSERT INTO favourites(exerciseId, userId, createdAt) VALUES(?, ?, ?)`,
      [idExercise, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addFavouriteQuery;
