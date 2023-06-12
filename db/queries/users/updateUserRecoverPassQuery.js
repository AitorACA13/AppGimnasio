const getDB = require('../../getDB');

const updateUserRecoverPassQuery = async (email, recoverPassCode) => {
  let connection;

  try {
    connection = await getDB();
    //Actualizamos los datos necesarios.
    await connection.query(
      `UPDATE users SET recoverPassCode = ?, modifiedAt = ? WHERE email = ?`,
      [recoverPassCode, new Date(), email]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserRecoverPassQuery;
