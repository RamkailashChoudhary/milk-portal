const UserRepository = require('./userRepository');

class Repository {
  constructor(db) {
    this._db = db;
  }

  registerRepositories() {
    this.user = new UserRepository(this._db);
  }
}

module.exports = Repository;
