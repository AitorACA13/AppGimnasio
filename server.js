require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// Creamos el servidor.
const app = express();

/**
 * #############################
 * ## Middlewares funcionales ##
 * #############################
 */

// Middleware que deserializa un body en formato raw creando la propiedad body
app.use(express.json());

// Middleware que deserializa un body en formato form data creando la propiedad body y la propiedad files.
app.use(fileUpload());

// Middleware que muestra información sobre la petición entrante
app.use(morgan('dev'));

//Middleware que evita problemas con cors cuando intentamos conectar el cliente con el servidor.
app.use(cors());

//Middleware que indica al servidor cual es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

/**
 * ##########################
 * ## Middlewares personalizados ##
 * ##########################
 */
const authUser = require('./middlewares/authUser');
const userExists = require('./middlewares/userExists');
const isAdmin = require('./middlewares/isAdmin');
const exerciseExists = require('./middlewares/exerciseExists');

/**
 * ##########################
 * ## Middlewares usuarios ##
 * ##########################
 */

const {
  newUser,
  loginUser,
  getUser,
  getOwnUser,
  deleteUser,
  editUserPass,
} = require('./controllers/users');

// Registro de usuario pendiente de validar.
app.post('/users', newUser);

// Login usuario >POST
app.post('/users/login', loginUser);

// Info usuario > GET
app.get('/users/:userId', getUser);

//Info usuario logueado >GET
app.get('/users', authUser, userExists, getOwnUser);

//Editar contraseña>PUT
app.put('/users/password', editUserPass); // _________________ ESTA A MEDIAS A FALTA DE COMPLETAR BREVO.____________

//Eliminar usuario.
app.delete('/users/:id', authUser, userExists, isAdmin, deleteUser);

/**
 * ###########################
 * ## Middlewares Exercises ##
 * ###########################
 */
const {
  newExercises,
  getExercise,
  modifyExercise,
  deleteExercise,
  addLike,
  deleteLike,
  listExercises,
  addFavourite,
  deleteFavourite,
  userFavourites,
} = require('./controllers/exercises');

//Nuevo ejercicio
app.post('/exercises', authUser, userExists, isAdmin, newExercises);
//mejor singular.

//Obtenemos información de un ejercicio en concreto.
app.get('/exercises/:id', authUser, getExercise);

// Modificamos el ejercicio
app.put('/exercises/:id', authUser, isAdmin, exerciseExists, modifyExercise);

//Eliminar ejercicio
app.delete('/exercises/:id', authUser, isAdmin, exerciseExists, deleteExercise);

//Listar y filtrar ejercicios.
app.get('/exercises', authUser, listExercises);

/**
 * ##################################
 * ## Middlewares Exercises-LIKES- ##
 * ##################################
 */

//Add like
app.post('/exercises/:id/likes', authUser, exerciseExists, addLike);

//Eliminar Like
app.delete('/exercises/:id/likes', authUser, exerciseExists, deleteLike);

/**
 * #######################################
 * ## Middlewares Exercises-FAVOURITES- ##
 * #######################################
 */
//Añadimos favoritos
app.post('/exercises/:id/favourites', authUser, exerciseExists, addFavourite);

//Eliminar favoritos
app.delete(
  '/exercises/:id/favourites',
  authUser,
  exerciseExists,
  deleteFavourite
);

//Listamos favoritos de un usuario
app.get('/favourites/:id', authUser, userExists, userFavourites);

/**
 * ################################################
 * ## Middlewares Control Errors & Server Listen ##
 * ################################################
 */

// Middleware de error.

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
