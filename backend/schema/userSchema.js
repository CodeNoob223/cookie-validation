const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  } 
});

//create collection with a specific schema
module.exports = {
  UserSchema: mongoose.model("User", userData)
};
