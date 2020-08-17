const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb+srv://root:root@cluster0.xjmgx.mongodb.net/star-wars?retryWrites=true&w=majority';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, {useUnifiedTopology : true}, (err, db) => {
        mongodb = db.db('star-wars');
        callback();
    });
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
