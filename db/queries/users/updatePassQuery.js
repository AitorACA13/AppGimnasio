const getDB = require('../../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const updatePassQuery = async (recoverPassCode, newPass) => {
  let connection;
  try {
    connection = await getDB();
    //Comprobamos si hay algún usuario con ese código de recuperación.
    const [users] = await connection.query(
      ` SELECT id FROM users WHERE recoverPassCode= ?`,
      [recoverPassCode]
    );

    //Si no hay ningún usuario con ese codigo de recuperación lanzamos un error.
    if (users.length < 1) {
      generateError('Código de recuperación incorrecto', 404);
    }

    //Encriptamos la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPass, 10);

    //Actualizamos el usuario.
    await connection.query(
      `
        UPDATE users SET password= ?, recoverPassCode= null, modifiedAt= ? WHERE recoverPassCode= ?`,
      [hashedPass, new Date(), recoverPassCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updatePassQuery;
