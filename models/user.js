var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    Username : { type : String},
    Password : {type : String},
    Name : {type : String},
    Surname : {type : String},
    Email : { type : String},
    Role: {type: String, enum:['admin', 'registered']},
    Type: {type: String, enum: ['local','facebook']}

}, {versionKey: false});

//permitimos que sea llamado desde el archivo principal de la aplicación
module.exports = mongoose.model('User', userSchema);
