const selectUserByEmailQuery = require('../../db/queries/users/selectUserByEmailQuery');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError('Faltan campos', 400);
    }

    const user = await selectUserByEmailQuery(email);

    //Comprobamos si las contraseñas coinciden.
    const validPass = await bcrypt.compare(password, user.password);

    //Si no coinciden lanzamos un error.
    if (!validPass) {
      generateError('Contraseña incorrecta', 401);
    }

    //Objeto con info que queremos agregar al token.
    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    //Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '10d',
    });

    res.send({
      status: 'ok',
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
