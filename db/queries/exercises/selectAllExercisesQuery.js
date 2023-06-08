const getDB = require('../../getDB');

const selectAllExercisesQuery = async (
  keyword = '',
  typology = '',
  muscleGroup = '',
  date = ''
) => {
  let connection;
  try {
    connection = await getDB();
    //si la fecha está en order ascendente (ASC), utilizar ASC. Sino establecer como valor por defecto DESC (descendente)
    date = date.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const [exercises] = await connection.query(
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
        WHERE E.name LIKE ? AND E.typologyId LIKE ? AND E.muscleGroupId LIKE ?
        GROUP BY E.id
        ORDER BY E.createdAt ${date};`,
      [`%${keyword}%`, `%${typology}%`, `%${muscleGroup}%`]
    );
    return exercises;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllExercisesQuery;
