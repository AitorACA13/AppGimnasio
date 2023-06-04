'use strict';

require('dotenv').config();

const getDB = require('./getDB');
const main = async () => {
  let connection;
  try {
    connection = await getDB();
    console.log('Borrando tablas del gym');
    // %%%%%%%%%%%%%  FALTA COLOCAR LAS FOREIGN KEY EN LAS TABLAS  %%%%%%%%%%%%%%%%%%%

    // await connection.query(`DROP DATABASE IF EXISTS gymñam`);

    await connection.query(`DROP TABLE IF EXISTS favourites`);
    await connection.query(`DROP TABLE IF EXISTS likes`);
    await connection.query(`DROP TABLE IF EXISTS muscleGroup`);
    await connection.query(`DROP TABLE IF EXISTS typologys`);
    await connection.query(`DROP TABLE IF EXISTS exercises`);
    await connection.query(`DROP TABLE IF EXISTS users `);

    console.log('Creando tablas...');

    //Creamos la tabla users.
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users(

      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
        name VARCHAR (30) NOT NULL ,
        email VARCHAR(100) UNIQUE NOT NULL , 
        password VARCHAR(100) NOT NULL,
        -- registrationCode POR SI ACASO QUEREMOS IMPLEMENTARLO, 
        -- recoverPassCode MAS DE LO MISMO  ,
        -- active BOOLEAN DEFAULT false,
        avatar VARCHAR(100) ,
        role ENUM('admin', 'normal') DEFAULT 'normal' ,
        modifiedAt DATETIME ,
        createdAt DATETIME NOT NULL
    );
    `);

    //Creamos la tabla exercises.
    await connection.query(`
        CREATE TABLE IF NOT EXISTS exercises(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR (50) UNIQUE NOT NULL,
          description VARCHAR(200) NOT NULL,
          photo VARCHAR(100),
          userId INT UNSIGNED NOT NULL,
          modifiedAt DATETIME,
          createdAt DATETIME NOT NULL,
          FOREIGN KEY(userId) REFERENCES users(id)
        );    
    `);

    //Creamos la tabla typology.
    await connection.query(`
     CREATE TABLE IF NOT EXISTS typologys(
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       exerciseId INT UNSIGNED NOT NULL,
       createdAt DATETIME NOT NULL,
       FOREIGN KEY(exerciseId) REFERENCES exercises(id)
     );
    `);

    //Creamos la tabla muscleGroup.
    await connection.query(`
       CREATE TABLE IF NOT EXISTS muscleGroup(
         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         exerciseId INT UNSIGNED NOT NULL,
         description VARCHAR(200) NOT NULL,
         createdAt DATETIME NOT NULL,
         FOREIGN KEY(exerciseId) REFERENCES exercises(id)
       );
    `);

    //Creamos la tabla likes.
    await connection.query(`
    CREATE TABLE IF NOT EXISTS likes(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      userId INT UNSIGNED NOT NULL,
      exerciseId INT UNSIGNED NOT NULL,
      createdAt DATETIME NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(exerciseId) REFERENCES exercises(id)
    );
    `);

    //Creamos la tabla favourites.
    await connection.query(`
       CREATE TABLE IF NOT EXISTS favourites(
         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         userId INT UNSIGNED NOT NULL,
         exerciseId INT UNSIGNED NOT NULL,
         createdAt DATETIME NOT NULL,
         FOREIGN KEY(userId) REFERENCES users(id),
         FOREIGN KEY(exerciseId) REFERENCES exercises(id)
       );
    `);

    console.log('Tablas creadas');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
