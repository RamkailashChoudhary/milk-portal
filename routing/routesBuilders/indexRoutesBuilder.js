const IndexController = require('../../controllers/IndexController');
const RoutesBase = require('../routesBuilderBase');
//routesBuilderBase

class IndexRoutesBuilder extends RoutesBase {
  constructor() {
    super(IndexController);
  }

  getRoutes() {
    this.buildRoute('/', 'get', 'index');
    this.buildRoute('/login/:id','get','login');
    this.buildRoute('/sign-up','post','signup');
    return this.routes;
  }
}

module.exports = IndexRoutesBuilder;
