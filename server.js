require('dotenv').config();

const express = require('express');
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

// Middleware que muestra información sobre la petición entrante
app.use(morgan('dev'));

/**
 * ##########################
 * ## Middlewares usuarios ##
 * ##########################
 */

const { newUser } = require('./controllers/users');

// Registro de usuario pendiente de validar.
app.post('/users', newUser);

// Login usuario >POST

// Info usuario > GET

//Info usuario logueado >GET

//Editar contraseña>PUT

//**extras**>Eliminar usuario (solo admin):DELETE & Editar usuario:PUT

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
