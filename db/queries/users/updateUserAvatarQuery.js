const getDB = require('../../getDB');

const updateUserAvatarQuery = async (avatar, userId) => {
  let connection;
  try {
    connection = await getDB();
    //Actualizamos el avatar y el campo "modifiedAt".
    await connection.query(
      ` UPDATE users SET avatar = ?, modifiedAt=? WHERE id=?
      `,
      [avatar, new Date(), userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserAvatarQuery;
