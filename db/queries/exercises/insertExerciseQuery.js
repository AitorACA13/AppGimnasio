const getDB = require('../../getDB');

const insertExerciseQuery = async (
  name,
  description,
  typologyId,
  muscleGroupId,
  photo,
  userId
) => {
  let connection;
  try {
    connection = await getDB();
    const createdAt = new Date();
    const [exercise] = await connection.query(
      `INSERT INTO exercises(name, description, typologyId, muscleGroupId, userId, photo, createdAt) 
      VALUES(?,?,?,?,?,?,?)`,
      [name, description, typologyId, muscleGroupId, userId, photo, createdAt]
    );
    return {
      id: exercise.insertId,
      name,
      description,
      typologyId: Number(typologyId),
      muscleGroupId: Number(muscleGroupId),
      userId,
      photo,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};
module.exports = insertExerciseQuery;
