const updatePassQuery = require('../../db/queries/users/updatePassQuery');

const { generateError } = require('../../helpers');

const editUserPass = async (req, res, next) => {
  try {
    const { recoverPassCode, newPass } = req.body;

    if (!recoverPassCode || !newPass) {
      generateError('Faltan campos', 400);
    }

    await updatePassQuery(recoverPassCode, newPass);

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserPass;
