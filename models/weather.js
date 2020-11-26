var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeatherSchema = new Schema(
  {
    tempurature: {type: Number, required: true},
    weather_type: {type: String, required: true}
  }
);

// Virtual for Tempurature
WeatherSchema
.virtual('temp')
.get(function () {
  return this.tempurature + '\u00B0';
});

//Export model
module.exports = mongoose.model('Weather', WeatherSchema);