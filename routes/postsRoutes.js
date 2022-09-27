const express = require('express')
const router = express();
const { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike } = require('../controllers/postController')

router.route('/posts')
.get(getAllPosts)
.post(addNewPost)

router.route('/posts/:id')
.delete(deleteThePost)
.put(editThePost)

router.put('/post/lod/:id', likeAndDislike)

router.get('/post/:id/comments', getOnePost)

router.get('/profile/:id', getProfile)

module.exports = router