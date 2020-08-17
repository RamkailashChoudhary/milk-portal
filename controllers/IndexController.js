const halson = require('halson');
const ControllerBase = require('./controllerBase');
const db = require('../dbconfig/db');

class IndexController extends ControllerBase {

  async login() {
    try {
     // const { id } = this.params;
      console.log("Print the params :"+JSON.stringify(this.params));
      console.log('PRINT THE COLLECTION NAME :'+db.get);
      const resource = { api: 'api v1' };
      db.get().collection('quotes').find({}).toArray()
	    .then((users) => {
        this.ok(users);
            console.log('Users', users);
        });
    } catch (err) {
      this.error(err);
    }
  }

  async signup(){
    try{
        console.log("Print the Body :"+JSON.stringify(this.body));
        const resource = halson({ api: 'sign-up body testing' });
        this.ok(resource);
    }catch(err){
      this.error(err);
    }
  }

  async index() {
    const getBookURI = this.uriGenerator.getURI(
        'BooksListController_getBook',
    );

    const rateBookURI = this.uriGenerator.getURI(
        'BooksListController_rateBook',
    );

    const removeBookURI = this.uriGenerator.getURI(
        'BooksListController_removeBook',
    );

    const resource = halson({ api: 'api v1' });
    try {
      const links = await Promise.all([
        getBookURI,
        rateBookURI,
        removeBookURI,
      ]);

      links.forEach((link) => {
        if (link) {
          resource.addLink(link.id, link);
        }
      });

      super.ok(resource);
    } catch (err) {
      super.error(err);
    }
  }
}

module.exports = IndexController;
