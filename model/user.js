const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: Number,
    city: String,
    state: String,
    address: String
});

module.exports = mongoose.model('User',userSchema);