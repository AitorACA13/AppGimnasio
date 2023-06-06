'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
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
    await connection.query(`DROP TABLE IF EXISTS exercises`);
    await connection.query(`DROP TABLE IF EXISTS muscleGroups`);
    await connection.query(`DROP TABLE IF EXISTS typologys`);
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

    //Creamos la tabla typology.
    await connection.query(`
     CREATE TABLE IF NOT EXISTS typologys(
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(50) UNIQUE NOT NULL,       
       createdAt DATETIME NOT NULL      
     );
    `);

    //Creamos la tabla muscleGroup.
    await connection.query(`
       CREATE TABLE IF NOT EXISTS muscleGroups(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL,       
        createdAt DATETIME NOT NULL  
       );
    `);

    //Creamos la tabla exercises.  MODELO A SEGUIR.
    await connection.query(`
      CREATE TABLE IF NOT EXISTS exercises(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR (50) UNIQUE NOT NULL,
        description VARCHAR(200) NOT NULL,
        photo VARCHAR(100),
        userId INT UNSIGNED NOT NULL,
        typologyId INT UNSIGNED NOT NULL,
        muscleGroupId INT UNSIGNED NOT NULL,
        modifiedAt DATETIME,
        createdAt DATETIME NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(typologyId) REFERENCES typologys(id),
        FOREIGN KEY(muscleGroupId) REFERENCES muscleGroups(id)
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

    //Encriptar la contraseña del admin
    const hashedPass = await bcrypt.hash('1234567', 10);
    //Crear un usuario de administrador.
    await connection.query(
      `INSERT INTO users (name, email, password, role , createdAt) VALUES('admin', 'admin@gmail.com', '${hashedPass}','admin' ,?)`,
      [new Date()]
    );

    console.log('Usuario administrador creado.');

    //Insertar grupos musculares.
    await connection.query(
      `INSERT INTO muscleGroups (name, createdAt) VALUES('biceps' ,?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO muscleGroups (name, createdAt) VALUES('triceps' ,?)`,
      [new Date()]
    );

    //insertar tipologias.
    await connection.query(
      `INSERT INTO typologys (name, createdAt) VALUES('fuerza' ,?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO typologys (name, createdAt) VALUES('resistencia' ,?)`,
      [new Date()]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
