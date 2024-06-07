const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const path = require('path');

const PORT = process.env.PORT || 5875;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log('JSON Server is running on port', PORT);
});

module.exports = server;
