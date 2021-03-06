var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MoodSchema = new Schema(
  {
    mood_percent: {type: Number, required: true},
    date: {type: Date, required: true},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tempurature: {type: Number, required: true},
    weather_type: {type: String, required: true}
  }
);

// Virtual for moodPercent
MoodSchema
.virtual('moodPercent')
.get(function () {
  return this.moodPercent + '%';
});

// Virtual for associated User
MoodSchema
.virtual('user')
.get(function () {
  return 1 // this._user;
});

//Export model
module.exports = mongoose.model('Mood', MoodSchema);