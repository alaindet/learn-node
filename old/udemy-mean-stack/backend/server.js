const http = require('http');
const debug = require('debug')('mean-node');

const app = require('./app');
const normalizePort = require('./utils/normalize-port');

const PORT = normalizePort(process.env.PORT || 3000);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${PORT}`;
  switch (error.code) {
    case 'EACCESS':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${PORT}`;
  debug(`Listening on ${bind}`);
};

app.set('port', PORT);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
