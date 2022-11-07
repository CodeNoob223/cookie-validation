const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  } 
});

//create collection with a specific schema
module.exports = mongoose.model("User", userData);
