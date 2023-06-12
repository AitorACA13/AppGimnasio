const getDB = require('../../getDB');

const selectUserByIdQuery = async (userId) => {
  let connection;
  try {
    connection = await getDB();
    //Seleccionamos los datos del usuario que queremos mostrar.
    const [users] = await connection.query(
      `SELECT id, name, email, avatar, role, createdAt FROM users WHERE id = ?`,
      [userId]
    );
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
