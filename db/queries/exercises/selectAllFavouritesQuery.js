const getDB = require('../../getDB');

const selectAllFavouritesQuery = async (userId, date = '') => {
  let connection;
  try {
    connection = await getDB();
    //si la fecha está en order ascendente (ASC), utilizar ASC. Sino establecer como valor por defecto DESC (descendente)
    date = date.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const [totalFavs] = await connection.query(
      `
        SELECT 
            E.id,
            E.name,
            E.description,
            E.photo,
            E.typologyId,
            E.muscleGroupId,
            E.createdAt
        FROM exercises E
        INNER JOIN favourites F ON E.id= F.exerciseId
        WHERE F.userId=? 
        ORDER BY E.createdAt ${date};`,
      [userId]
    );
    return totalFavs;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllFavouritesQuery;
