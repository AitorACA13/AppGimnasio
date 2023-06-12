const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const updateUserAvatarQuery = require('../../db/queries/users/updateUserAvatarQuery');

//Importamos los middlewares para borrar y guardar fotos.
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editUserAvatar = async (req, res, next) => {
  try {
    //Si falta el avatar lanzamos un error
    if (!req.files?.avatar) {
      generateError('Falta campos', 400);
    }

    //Obtenemos los datos del usuario
    const user = await selectUserByIdQuery(req.user.id);

    //Si el usuario ya tiene un avatar lo eliminamos.
    if (user.avatar) {
      await deletePhoto(user.avatar);
    }

    //Creamos la variable que almacenará el nuevo avatar.
    const avatar = await savePhoto(req.files.avatar, 100);

    //Actualizamos el avatar del usuario.
    await updateUserAvatarQuery(avatar, req.user.id);
    res.send({
      status: 'ok',
      message: 'Avatar actualizado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserAvatar;
