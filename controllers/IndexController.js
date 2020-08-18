const halson = require('halson');
const ControllerBase = require('./controllerBase');
const User = require('../model/user');
const mongoose = require('mongoose');

class IndexController extends ControllerBase {

  async login() {
    try {
     // const { id } = this.params;
     console.log("Print the params :"+JSON.stringify(this.query));
      console.log("Print the params :"+JSON.stringify(this.params));
     
      const u = new User({
        email: this.query.email,
        password: this.query.password
      });

      User.findOne(u).select('name email phoneNumber city').populate('User','name').exec().then(result => {
        console.log('SUCCESS'+result);
        if(result)
         this.ok(result)
        else{
          const resource = halson({ data: u,message: 'User does not exist' });
          this.error(resource);
        } 
      }).catch(err => {
        console.log('FAILED :'+err);
        this.error(err);  
      });
    } catch (err) {
      this.error(err);
    }
  }

  async signup(){
    try{
        console.log("Name :"+this.body.name);
        console.log("Print the Body :"+JSON.stringify(this.body));
        const u = new User({
             _id: new mongoose.Types.ObjectId(),
             name: this.body.name,
             email: this.body.email,
             password: this.body.password,
             phoneNumber: this.body.phoneNumber,
             city: this.body.city,
             state: this.body.state,
             address: this.body.address
         
        });
        u.save().then(result =>{
          console.log("success :"+result);
          this.ok(result);
        }).catch(err =>{
          console.log("error :"+err);
          this.error(err);  
        });
        console.log("Print the Body :"+JSON.stringify(this.body));
    //  this.ok(u);
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
