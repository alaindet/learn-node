const { getConnection } = require('../../../core/database');
const NotFoundException = require('../exceptions/not-found.exception');

const getTodo = async id => {

  const db = await getConnection();
  const sql = `SELECT * FROM todos WHERE title = :title`;
  const values = { title: dto.title };
  const query = { namedPlaceholders: true, sql };
  const result = await db.query(query, values);
  db.end();

  if (!result.length) {
    throw new NotFoundException(`Todo #${id} not found`);
  }

  return result[0];
};

module.exports = {
  getTodo,
};
