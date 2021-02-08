const mongoose = require('mongoose')

var memberSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  scores: [Number]
});

var teamSchema = new mongoose.Schema({
    _id: String,
    guid: String,
    team: String,
    pitch1: Boolean,
    pitch2: Boolean,
    teachPitch: Boolean,
    businessReport: Boolean,
    teachReport: Boolean,
    members: [memberSchema]
})


module.exports = mongoose.model('Team', teamSchema, 'teams')