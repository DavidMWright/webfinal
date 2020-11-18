var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeatherTypeSchema = new Schema(
  {
    type: {type: String, required: true},
  }
);

// Virtual for type
WeatherTypeSchema
.virtual('type')
.get(function () {
  return this.type;
});

// Virtual for 
WeatherTypeSchema
.virtual('user')
.get(function () {
  return 1
});

//Export model
module.exports = mongoose.model('Weather', WeatherTypeSchema);