const express = require('express')
const router = express();
const { getAllComments, addNewComment, deleteTheComment, editTheComment } = require('../controllers/commentController')

router.route('/:id/comments')
.get(getAllComments)
.post(addNewComment)

router.route('/comment/:id')
.delete(deleteTheComment)
.put(editTheComment)

module.exports = router