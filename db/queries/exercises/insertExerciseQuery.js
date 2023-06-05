const { description } = require('@hapi/joi/lib/base');
const getDB = require('../../getDB');
const insertExerciseQuery = async (
  name,
  description,
  typology,
  muscleGroup,
  userId,
  photo
) => {
  let connection;
  try {
    connection = await getDB();
    const createdAt = new Date();
    const [exercise] = await connection.query(
      `INSERT INTO exercises(name, description, typology, muscleGroup, userId, photo, createdAt) 
      VALUES(?,?,?,?,?,?,?)`,
      [name, description, typology, muscleGroup, userId, photo, createdAt]
    );
    return {
      id: exercise.insertId,
      name,
      description,
      typology,
      muscleGroup,
      userId,
      photo,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};
module.exports = insertExerciseQuery;
