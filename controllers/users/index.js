const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const getOwnUser = require('./getOwnUser');
const deleteUser = require('./deleteUser');
const editUserPass = require('./editUserPass');
const validateUser = require('./validateUser');
const sendRecoverPass = require('./sendRecoverPass');
const editUserAvatar = require('./editUserAvatar');
module.exports = {
  newUser,
  loginUser,
  getUser,
  getOwnUser,
  deleteUser,
  editUserPass,
  validateUser,
  sendRecoverPass,
  editUserAvatar,
};
