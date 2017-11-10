var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    token: {type:String, required: true},
    image: {type:String, required: true},
    name:  {type:String, required: true},
    email: {type:String, required: true, unique:true}
})
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Signin', schema); 