const getDB = require('../db/getDB');

const { generateError } = require('../helpers');

const isAdmin = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const [users] = await connection.query(
      `
        SELECT role FROM users WHERE id = ?`,
      [req.user.id]
    );
    if (users[0].role !== 'admin') {
      generateError('No tienes suficientes permisos', 401);
    }
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isAdmin;
