const getDB = require('../db/getDB');

const { generateError } = require('../helpers');

const userExists = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    //Seleccionamos el id del usuario.
    const [users] = await connection.query(
      `
        SELECT id FROM users WHERE id = ?`,
      [req.user.id]
    );
    //Si el usuario no existe, lanzamos un error.
    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
