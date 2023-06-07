const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteLikeQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    //Comprobamos si el usuario ya ha dado a like
    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE exerciseId=? AND userId=?`,
      [idExercise, userId]
    );

    if (likes.length < 1) {
      generateError('Like no encontrado', 404);
    }

    await connection.query(
      `DELETE FROM likes WHERE exerciseId=? AND userId=?`,
      [idExercise, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteLikeQuery;
