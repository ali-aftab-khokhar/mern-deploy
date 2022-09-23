const express = require('express')
const app = express();
const protect = require('../middleware/authMiddleware')
const { getAllComments, addNewComment, deleteTheComment, editTheComment } = require('../controllers/commentController')

app.route('/api/:id/comments', protect)
.get(getAllComments)
.post(addNewComment)

app.route('/api/comment/:id', protect)
.delete(deleteTheComment)
.put(editTheComment)

module.exports = app