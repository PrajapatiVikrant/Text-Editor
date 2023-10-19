const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
  data:{
    type:String
  }
});

const userModel = mongoose.model('file', userSchema);

module.exports = userModel;