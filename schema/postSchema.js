const mongoose = require('mongoose')
const CONSTANTS = require('../constants')
const type = require('../dataType')

const postSchema = new mongoose.Schema({
  ownerName: type.string,
  title: {
    type: String,
    required: [true, CONSTANTS.ENTER_TITLE]
  },
  body: {
    type: type.string,
    required: [true, CONSTANTS.ENTER_BODY]
  },
  ownerEmail: type.string,
  likes: [type.string],
  status: type.string
})

const Posts = mongoose.model(CONSTANTS.POSTS_SCHEMA, postSchema)
module.exports = Posts
