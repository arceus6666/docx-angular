const mongoose = require('mongoose')
const Schema = mongoose.Schema

var wordSchema = new Schema({
  hash: String,
  type: String
})

var Word = mongoose.model('Word', wordSchema)

module.exports = Word
