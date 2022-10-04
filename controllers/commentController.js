const CONSTANTS = require('../constants')
const CommentServices = require('../services/commentServices')

const getAllComments = (req, res) => {
  try {
    CommentServices.getAllComments(req.params.postId, res)
  } catch {
    res.status(400).send(CONSTANTS.COMMENTS_FETCH_FAILED)
  }
}

const addNewComment = (req, res) => {
  try {
    const payload = {
      commentOn: req.params.postId,
      commentBy: req.body.commentBy,
      commentBody: req.body.commentBody
    }
    CommentServices.addNewComment(payload, res)
    res.status(200).send(CONSTANTS.COMMENTED)
  } catch {
    res.status(400).send(CONSTANTS.PUBLISH_NEW_COMMENT_FAILED)
  }
}

const deleteTheComment = (req, res) => {
  try {
    CommentServices.deleteTheComment(req.params.commentId, res)
    res.status(200).send(CONSTANTS.DELETED)
  } catch {
    res.status(400).send(CONSTANTS.DELETION_FAILED)
  }
}

const editTheComment = (req, res) => {
  try {
    CommentServices.editTheComment(req.params.commentId, req.body.updatedComment, res)
    res.status(200).send(CONSTANTS.UPDATED)
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
