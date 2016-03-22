var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaceSchema = new Schema({
    _id: {type: Schema.ObjectId, ref: 'Races'},
    Race: {type: String},
    State: {type: String, enum: ['Done','Pending']},
    Data: {
        Time: {type: Number},
        Distance: {type: Number},
        Tour:[ {
            Lng: {type: Number},
            Ltd: {type: Number}
        }]
    }
});

var GroupSchema = new Schema({
    _id: {type: Schema.ObjectId, ref: 'Groups'},
    Group: {type: String}
});

var userSchema = new Schema({
    Username : { type : String},
    Password : {type : String},
    Name : {type : String},
    Surname : {type : String},
    Email : { type : String},
    Birthdate : {type : Date , format : "YYYY-MM-DD HH:mm:ss"},
    Gender : {type : String, enum: ['male', 'female']},
    Location: {
        Lng: {type: Number},
        Ltd: {type: Number}
    },
    Level: {type: String, enum: ['Beginner', 'Medium', 'High']},
    Groups: [GroupSchema],
    Races: [RaceSchema],
    Role: {type: String, enum:['admin', 'registered']},
    Type: {type: String, enum: ['local','facebook']}

}, {versionKey: false});
