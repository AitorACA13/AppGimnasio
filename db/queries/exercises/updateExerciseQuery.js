const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const updateExerciseQuery = async (exerciseBody, userId, userRole) => {
  let connection;
  try {
    connection = await getDB();
    const { name, description, typologyId, muscleGroup, modifiedAt } =
      exerciseBody;
    await connection.query(
      `
        UPDATE exercises SET name = ?, description = ?, typologyId = ?, muscleGroup = ? modifiedAt = ? ,  WHERE id = ?
        `,
      [
        name,
        description,
        typologyId,
        muscleGroup,
        modifiedAt,
        new Date(),
        userId,
      ]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateExerciseQuery;
