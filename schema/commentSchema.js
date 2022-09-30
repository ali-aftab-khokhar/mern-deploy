const mongoose = require('mongoose')
const CONSTANTS = require('../constants')
const type = require('../dataType')

const commentSchema = new mongoose.Schema({
  commentBody: {
    type: type.string,
    required: [true, CONSTANTS.ENTER_COMMENT]
  },
  commentBy: type.string,
  commentOn: type.string,
  commentByName: type.string
})

const Comments = mongoose.model(CONSTANTS.COMMENTS_SCHEMA, commentSchema)
module.exports = Comments
