const getDB = require('../../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');
const insertUserQuery = async (name, email, password, registrationCode) => {
  let connection;

  try {
    connection = await getDB();

    //Comprobamos si el email está repetido.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    //Si el array de usuarios tiene más de 0 usuarios quiere decir que el email está repetido.
    if (users.length > 0) {
      generateError('Ya existe un usuario con ese email', 403);
    }

    //Encriptamos la contraseña. 10=indica el nivel de seguridad. Cuanto mas alto el valor, más segura la encriptacion.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO users (name, email, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)`,
      [name, email, hashedPass, registrationCode, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
