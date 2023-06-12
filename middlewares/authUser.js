const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
  try {
    //Pedimos un token de autorización en la cabecera de la petición...
    const { authorization } = req.headers;
    //...y si no existe, lanzamos error.
    if (!authorization) {
      generateError('Falta la cabecera de autentificación', 401);
    }
    let tokenInfo;
    try {
      //Verificamos el token, lanzando a continuación un error si no es válido.
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      generateError('Token inválido', 401);
    }
    req.user = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
