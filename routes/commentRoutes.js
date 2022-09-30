const express = require('express')
const router = express()
const { getAllComments, addNewComment, deleteTheComment, editTheComment } = require('../controllers/commentController')
const auth = require('../middleware/auth')

router.get('/:id/comments', auth, getAllComments)

router.post('/:id/comments', auth, addNewComment)

router.put('/comment/:id', auth, editTheComment)

router.delete('/comment/:id', auth, deleteTheComment)

module.exports = router
