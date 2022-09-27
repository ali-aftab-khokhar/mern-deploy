const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const CONSTANTS = require('../constants')

const getCommentsService = async (id, res) => {
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

const addCommentService = async (payload, res) => {
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

const deleteCommentService = async (id, res) => {
    try {
        await Comment.findByIdAndDelete(id)
    } catch {
        res.status(400).send(CONSTANTS.DELETION_FAILED)
    }
}

const editCommentService = async (id, body, res) => {
    try {
        await Comment.findByIdAndUpdate(id, {
            commentBody: body
        })
    } catch {
        res.status(400).send(CONSTANTS.EDIT_FAILED)
    }
}

module.exports = {
    getCommentsService,
    addCommentService,
    deleteCommentService,
    editCommentService
}