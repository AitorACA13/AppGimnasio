const getDB = require('../../getDB');

const deleteUserQuery = async (userId) => {
  let connection;
  try {
    connection = await getDB();

    //Borramos primero los likes porque dependen del usuario.
    await connection.query(
      `
            DELETE
            FROM likes
            WHERE userId = ?
        `,
      [userId]
    );
    //Después borramos los favoritos porque también dependen del usuario.
    await connection.query(
      `
            DELETE
            FROM favourites
            WHERE userId = ?
        `,
      [userId]
    );
    //Finalmente borramos el usuario.
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
