'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const getDB = require('./getDB');
const main = async () => {
  let connection;
  try {
    connection = await getDB();

    console.log('Borrando tablas del gym');

    await connection.query(`DROP TABLE IF EXISTS favourites`);
    await connection.query(`DROP TABLE IF EXISTS likes`);
    await connection.query(`DROP TABLE IF EXISTS exercises`);
    await connection.query(`DROP TABLE IF EXISTS muscleGroups`);
    await connection.query(`DROP TABLE IF EXISTS typologys`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log('Creando tablas...');

    //Creamos la tabla users.
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users(

      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
        name VARCHAR (30) NOT NULL ,
        email VARCHAR(100) UNIQUE NOT NULL , 
        password VARCHAR(100) NOT NULL,
        registrationCode VARCHAR(100),
        recoverPassCode VARCHAR(100) ,
        active BOOLEAN DEFAULT false,
        avatar VARCHAR(100),
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

    //Creamos la tabla exercises.
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

    //Encriptamos la contraseña del admin.
    const hashedPass = await bcrypt.hash('1234567', 10);

    //Creamos un usuario de administrador.
    await connection.query(
      `INSERT INTO users (name, email, password, role , createdAt) VALUES('Marina', 'admin@gmail.com', '${hashedPass}','admin' ,?)`,
      [new Date()]
    );

    console.log('Usuario administrador creado.');

    //Insertamos los grupos musculares.
    await connection.query(
      `INSERT INTO muscleGroups (name, createdAt) VALUES('biceps' ,?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO muscleGroups (name, createdAt) VALUES('Completo' ,?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO muscleGroups (name, createdAt) VALUES('Tren inferior' ,?)`,
      [new Date()]
    );

    //Insertamos las tipologias.
    await connection.query(
      `INSERT INTO typologys (name, createdAt) VALUES('Musculación' ,?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO typologys (name, createdAt) VALUES('Cardio' ,?)`,
      [new Date()]
    );
    // Insertar ejercicios base musculación.
    await connection.query(
      `INSERT INTO exercises (id, name, description, photo, userId, typologyId, muscleGroupId, createdAt) VALUES(1, 'Curl con barra', 'Para ejecutarlo tomamos la barra, pegamos los codos a los costados de nuestro cuerpo y tiramos los codos hacia atrás y debemos subir el peso y bajarlo lentamente hasta estirar el brazo completamente.', 'ruta_de_la_foto', 1, 1, 1, ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO exercises (id, name, description, photo, userId, typologyId, muscleGroupId, createdAt) VALUES(2, 'Curl Martillo con mancuerna', 'Colócate de pie, con las rodillas ligeramente flexionadas y coge una mancuerna en cada mano, mantén la espalda recta y los brazos deben estar extendidos a lo largo de los costados.', 'ruta_de_la_foto', 1, 2, 2, ?)`,
      [new Date()]
    );

    //Insertar ejercicios base Cardio.
    await connection.query(
      `INSERT INTO exercises (id, name, description, photo, userId, typologyId, muscleGroupId, createdAt) VALUES(3, 'Elíptica', 'Consta de dos pedales sobre los que se marcha y de dos barras verticales que se cogen con las manos para ayudar al movimiento de impulsión de las piernas y se hace más fácil el ejercicio.', 'ruta_de_la_foto', 1, 1, 1, ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO exercises (id, name, description, photo, userId, typologyId, muscleGroupId, createdAt) VALUES(4, 'Cinta de correr', 'máquina para entrenamiento físico que puede funcionar mediante propulsión eléctrica o manual, y que sirve para correr o andar sin moverse de un mismo sitio.', 'ruta_de_la_foto', 1, 2, 3, ?)`,
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
