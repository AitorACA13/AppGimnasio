require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//middleware que indica a express donde se encuentran las rutas de usuarios
app.use(userRoutes);

//_____________ MIDDLEWARES DE ERROR ____________________
//error middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
});

//path not found
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
