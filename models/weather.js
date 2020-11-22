var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeatherSchema = new Schema(
  {
    tempurature: {type: Number, required: true},
    _weather_type: {type: mongoose.Schema.Types.ObjectId, ref: 'WeatherType'}
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