const halson = require('halson');
const ControllerBase = require('./controllerBase');
const { request } = require('express');

class IndexController extends ControllerBase {

  async login() {
    try {
     // const { id } = this.params;
      console.log("Print the params :"+JSON.stringify(this.params));
      const resource = { api: 'api v1' };
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async signup(){
    try{
        request.body;
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
