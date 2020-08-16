const App = require('./app');
const Router = require('./routing/router');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');

class Server {
  constructor() {
    this.router = new Router([
      new IndexRoutesBuilder(),
    ], this.router);

    this.app = new App(this.router);
  }

  start() {
    this.app.run();
  }
}

const server = new Server();
server.start();
