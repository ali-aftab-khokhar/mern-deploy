const express = require('express')
const router = express()
const { getAllComments, addNewComment, deleteTheComment, editTheComment } = require('../controllers/commentController')
const auth = require('../middleware/auth')

router.get('/:postId/comments', auth, getAllComments)

router.post('/:postId/comments', auth, addNewComment)

router.put('/comment/:commentId', auth, editTheComment)

router.delete('/comment/:commentId', auth, deleteTheComment)

module.exports = router
