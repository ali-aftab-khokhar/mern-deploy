const express = require('express')
const app = express();
const { getAllComments, addNewComment, deleteTheComment, editTheComment } = require('../controllers/commentController')

app.route('/api/:id/comments')
.get(getAllComments)
.post(addNewComment)

app.route('/api/comment/:id')
.delete(deleteTheComment)
.put(editTheComment)

module.exports = app