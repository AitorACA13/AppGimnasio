const getDB = require('../../getDB');

const selectUserByIdQuery = async (userId) => {
  let connection;
  try {
    connection = await getDB();
    const [users] = await connection.query(
      `SELECT id, name, email, createdAt FROM users WHERE id = ?`,
      [userId]
    );
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
