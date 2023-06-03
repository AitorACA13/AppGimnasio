'use strict';

const mysql = require('mysql2/promise');

//Obtenemos las variables de entorno
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

//Variable que almacena grupo de conexiones.
let pool;

//Función que retorna conexión libre con la base de datos.
const getDB = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
      });
      return await pool.getConnection();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getDB;
