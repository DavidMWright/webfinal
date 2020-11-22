var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeatherTypeSchema = new Schema(
  {
    w_type: {type: String, required: true},
  }
);

// Virtual for type
WeatherTypeSchema
.virtual('type')
.get(function () {
  return this.w_type;
});

//Export model
module.exports = mongoose.model('WeatherType', WeatherTypeSchema);