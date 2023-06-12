const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    //Tratamos de localizar al usuario con el email establecido.
    const [users] = await connection.query(
      `SELECT id, password, role, active FROM users WHERE email = ?`,
      [email]
    );

    //Si no existe ningún usuario con ese email lanzamos un error.
    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }

    //El array de usuarios solo podrá contener a un usuario dado que hemos establecido
    //como regla que el email no puede repetirse más de una vez. Devolvemos al usuario
    //que estará en la posición cero.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
