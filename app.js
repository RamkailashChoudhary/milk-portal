const express = require('express');
const bodyParser = require('body-parser');
const URIGenerator = require('./routing/uriGenerator');

class App {
  constructor(router) {
    this.router = router;
    this.port = process.env.PORT || 3000;
    this.host= 'localhost';
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }

  _registerRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  _createRouteBoundAction(controllerClass, method, isSecure) {
    const result = [
      (req, res) => {
        this._buildControllerInstance(controllerClass, req, res)[method]();
      }];

    if (isSecure) {
      result.unshift(
       //   this.security.authenticate(),
       //   this.security.authorise(controllerClass.name, method),
      );
    }

    return result;
  }

  _buildControllerInstance(ControllerClass, req, res) {
    return new ControllerClass(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          user: req.user,
          uriGenerator: new URIGenerator(),
          send: (statusCode, resource) => {
            res.status(statusCode).send(resource);
          },
        },
    );
  }

  run() {
    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);
    this.express.use('/api/v1', this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on: ${this.port}`);
  }
}

module.exports = App;
