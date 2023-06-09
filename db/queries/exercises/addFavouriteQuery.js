const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const addFavouriteQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    //comprobamos si el usuario ya ha dado favorito
    const [favourites] = await connection.query(
      `SELECT id FROM favourites WHERE exerciseId =? AND userId=?`,
      [idExercise, userId]
    );
    if (favourites.length > 0) {
      generateError(
        'No puedes añadir a favoritos dos veces al mismo ejercicio',
        403
      );
    }
    await connection.query(
      `INSERT INTO favourites(exerciseId, userId, createdAt) VALUES(?, ?, ?)`,
      [idExercise, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addFavouriteQuery;
