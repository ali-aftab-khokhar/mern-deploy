const express = require('express')
const router = express()
const auth = require('../middleware/auth')
const {
  getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike,
  publishThePost, unpublishThePost
} = require('../controllers/postController')

router.get('/posts', getAllPosts)

router.post('/posts', auth, addNewPost)

router.put('/posts/:postId', auth, editThePost)

router.delete('/posts/:postId', auth, deleteThePost)

router.put('/post/lod/:postId', auth, likeAndDislike)

router.get('/post/:postId/comments', auth, getOnePost)

router.get('/profile/:postId', auth, getProfile)

router.put('/post/:postId/publish', auth, publishThePost)

router.put('/post/:postId/unpublish', auth, unpublishThePost)

module.exports = router
