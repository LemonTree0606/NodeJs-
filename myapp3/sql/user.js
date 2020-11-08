const db = require('./db');

const userSchema = new db.mongoose.Schema({
    // "_id":{type:String},
    "userName":{type:String},
    "userPassword":{type:String}
});


 
module.exports = db.mongoose.model("users",userSchema)