const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const addLikeQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    //comprobamos si el usuario ya ha dado like
    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE exerciseId =? AND userId=?`,
      [idExercise, userId]
    );
    if (likes.length > 0) {
      generateError('No puedes dar like dos veces al mismo ejercicio', 403);
    }
    await connection.query(
      `INSERT INTO likes(exerciseId, userId, createdAt) VALUES(?, ?, ?)`,
      [idExercise, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addLikeQuery;
