const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteFavouriteQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    //Comprobamos si el usuario ya ha dado a like
    const [favourites] = await connection.query(
      `SELECT id FROM favourites WHERE exerciseId=? AND userId=?`,
      [idExercise, userId]
    );

    if (favourites.length < 1) {
      generateError('Favorito no encontrado', 404);
    }

    await connection.query(
      `DELETE FROM favourites WHERE exerciseId=? AND userId=?`,
      [idExercise, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFavouriteQuery;
