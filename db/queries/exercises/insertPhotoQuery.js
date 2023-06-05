const getDB = require('../../getDB');
const insertPhotoQuery = async (photoName, exerciseId) => {
  let connection;
  try {
    connection = await getDB();
    const createdAt = new Date();
    const [photo] = await connection.query(
      `INSERT INTO exercises (photoName, exerciseId, createdAt)
            VALUES(?,?,?)`,
      [photoName, exerciseId, createdAt]
    );
    return {
      id: photo.insertId,
      name: photoName,
      exerciseId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};
module.export = insertPhotoQuery;
