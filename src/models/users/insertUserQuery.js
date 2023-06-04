const getDB = require('../../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../../helpers');

const insertUserQuery = async (name, email, password) => {
  let connection;
  try {
    connection = await getDB();
    let [users] = await connection.query(
      `SELECT id FROM users WHERE email =?`,
      [email]
    );
    if (users.length > 0) {
      generateError('Ese email ya esta registrado.', 403);
    }
    const hashedPass = await bcrypt.hash(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPass, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.export = insertUserQuery();
