const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const CONSTANTS = require('../constants')

const getAllComments = async (id, res) => {
  try {
    Comment.find({ commentOn: id }, function (err, doc) {
      if (!err) {
        res.status(200)
        res.json(doc)
      }
    })
  } catch {
    res.status(400)
  }
}

const addNewComment = async (payload, res) => {
  try {
    User.find({ email: payload.commentBy }, function (err, doc) {
      if (err) {
        res.status(400).send(CONSTANTS.SOMETHING_WENT_WRONG)
      }
      const commentDetails = new Comment({
        commentBody: payload.commentBody,
        commentBy: payload.commentBy,
        commentOn: payload.commentOn,
        commentByName: doc[0].name
      })
      commentDetails.save()
    })
  } catch {
    res.status(400).send(CONSTANTS.PUBLISH_NEW_POST_FAILED)
  }
}

const deleteTheComment = async (id, res) => {
  try {
    await Comment.findByIdAndDelete(id)
  } catch {
    res.status(400).send(CONSTANTS.DELETION_FAILED)
  }
}

const editTheComment = async (id, body, res) => {
  try {
    await Comment.findByIdAndUpdate(id, {
      commentBody: body
    })
  } catch {
    res.status(400).send(CONSTANTS.EDIT_FAILED)
  }
}

module.exports = {
  getAllComments,
  addNewComment,
  deleteTheComment,
  editTheComment
}
