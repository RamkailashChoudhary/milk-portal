//const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mongoDbUrl = 'mongodb+srv://root:root@cluster0.xjmgx.mongodb.net/milk-portal?retryWrites=true&w=majority';
let mongodb;

function connect(callback){
 //   mongoClient.connect(mongoDbUrl, {useUnifiedTopology : true}, (err, db) => {
 //       mongodb = db.db('milk-portal');
 //       console.log("collection name :");
 //       callback();
 //   });
   mongoose.connect(mongoDbUrl,{useNewUrlParser: true, useUnifiedTopology: true});
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};
