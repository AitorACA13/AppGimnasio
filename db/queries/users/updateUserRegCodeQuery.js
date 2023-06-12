const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const updateUserRegCodeQuery = async (regCode) => {
  let connection;
  try {
    connection = await getDB();

    //Intentamos localizar a un usuario con el código de registro que nos llegue.
    const [users] = await connection.query(
      `SELECT id FROM users WHERE registrationCode=?`,
      [regCode]
    );

    //Si no hay usuarios con ese código de registro lanzamos un error.
    if (users.length < 1) {
      generateError('Código no encontrado', 404);
    }

    //Actualizamos el usuario.
    await connection.query(
      `
      UPDATE users SET active=true, registrationCode=null, modifiedAt=? WHERE registrationCode=?`,
      [new Date(), regCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserRegCodeQuery;
