const express = require('express')
const router = express()
const auth = require('../middleware/auth')
const {
  getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike,
  publishThePost, unpublishThePost
} = require('../controllers/postController')

router.get('/posts', getAllPosts)

router.post('/posts', auth, addNewPost)

router.put('/posts/:id', auth, editThePost)

router.delete('/posts/:id', auth, deleteThePost)

router.put('/post/lod/:id', auth, likeAndDislike)

router.get('/post/:id/comments', auth, getOnePost)

router.get('/profile/:id', auth, getProfile)

router.put('/post/:id/publish', auth, publishThePost)

router.put('/post/:id/unpublish', auth, unpublishThePost)

module.exports = router
