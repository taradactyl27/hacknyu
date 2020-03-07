const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  activetasks: {
    type: Array,
    required: false
  },
  scheduledtasks: {
    type: Array,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});
module.exports = User = mongoose.model("users", UserSchema);