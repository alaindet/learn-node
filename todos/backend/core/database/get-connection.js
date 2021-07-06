const mariadb = require('mariadb');

// TODO: Move into environment
const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'todoapp',
  password: 'todoapp',
  database: 'todoapp',
  connectionLimit: 5,
  connectTimeout: 2000,
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    if (connection) {
      connection.end();
    }
    throw err;
  }
};

module.exports = {
  getConnection,
};
