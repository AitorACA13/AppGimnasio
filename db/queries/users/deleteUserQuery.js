const getDB = require('../../getDB');

const deleteUserQuery = async (userId) => {
  let connection;
  try {
    connection = await getDB();

    //borramos primero los likes porque dependen del usuario
    await connection.query(
      `
            DELETE
            FROM likes
            WHERE userId = ?
        `,
      [userId]
    );
    //borramos primero los favoritos porque dependen del
    await connection.query(
      `
            DELETE
            FROM favourites
            WHERE userId = ?
        `,
      [userId]
    );
    //finalmente borramos el usuario.
    await connection.query(
      `
          DELETE
          FROM users
          WHERE id = ?
      `,
      [userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUserQuery;
