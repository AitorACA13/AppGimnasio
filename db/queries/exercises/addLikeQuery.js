const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const addLikeQuery = async (idExercise, userId) => {
  let connection;
  try {
    connection = await getDB();

    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE exerciseId =? AND userId=?`,
      [idExercise, userId]
    );
    //Lanzamos un error si el usuario ya ha dado like al ejercicio.
    if (likes.length > 0) {
      generateError('No puedes dar like dos veces al mismo ejercicio', 403);
    }
    //Insertamos los valores necesarios en la tabla "likes" para añadir un like.
    await connection.query(
      `INSERT INTO likes(exerciseId, userId, createdAt) VALUES(?, ?, ?)`,
      [idExercise, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addLikeQuery;
