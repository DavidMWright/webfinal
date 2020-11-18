var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    user_name: {type: String, required: true, maxlength: 100, unique: true},
    password: {type: String, required: true, maxlength: 100},
    email: {type: String, required: true, maxlength: 100}
  }
);

// Virtual for users's full name
UserSchema
.virtual('fullName')
.get(function () {
  return this.first_name + ' ' + this.last_name;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/users/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);