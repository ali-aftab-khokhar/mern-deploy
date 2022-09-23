const express = require('express')
const app = express();
const { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike } = require('../controllers/postController')

app.route('/api/posts')
.get(getAllPosts)
.post(addNewPost)

app.route('/api/posts/:id')
.delete(deleteThePost)
.put(editThePost)

app.put('/api/post/lod/:id', likeAndDislike)

app.get('/api/post/:id/comments', getOnePost)

app.get('/api/profile/:id', getProfile)

module.exports = app