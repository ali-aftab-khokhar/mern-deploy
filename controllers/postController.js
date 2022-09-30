const CONSTANTS = require('../constants')
const PostServices = require('../services/postServices')

const getAllPosts = (req, res) => {
  try {
    PostServices.getAllPosts(res)
  } catch {
    res.status(400).send(CONSTANTS.POST_FETCH_FAILED)
  }
}

const addNewPost = (req, res) => {
  const { ownerName, ownerEmail, title, body, likes, status } = req.body
  try {
    PostServices.addNewPost(ownerName, ownerEmail, title, body, likes, status, res)
  } catch {
    res.status(400).send(CONSTANTS.PUBLISH_NEW_POST_FAILED)
  }
}

const deleteThePost = (req, res) => {
  try {
    PostServices.deleteThePost(req.params.id, res)
    res.status(200).send(CONSTANTS.POSTED)
  } catch {
    res.status(400).send(CONSTANTS.DELETION_FAILED)
  }
}

const editThePost = (req, res) => {
  try {
    PostServices.editThePost(req.params.id, req.body.title, req.body.body, res)
    res.status(200).send(CONSTANTS.POSTED)
  } catch {
    res.status(400).send(CONSTANTS.EDIT_FAILED)
  }
}

const getOnePost = (req, res) => {
  try {
    PostServices.getOnePost(req, res)
  } catch {
    res.status(400).send(CONSTANTS.CANT_GET_INDIVIDUAL_POST)
  }
}

const getProfile = (req, res) => {
  try {
    PostServices.getProfile(req.params.id, res)
  } catch {
    res.status(400).send(CONSTANTS.PROFILE_DATA_FAILED)
  }
}

const likeAndDislike = (req, res) => {
  try {
    PostServices.likeAndDislike(req, res)
  } catch {
    res.status(400).send(CONSTANTS.LIKE_DISLIKE_FAILED)
  }
}

const publishThePost = (req, res) => {
  try {
    PostServices.publishThePost(req, res)
  } catch {
    res.status(400).send(CONSTANTS.PUBLISHED_FAILED)
  }
}

const unpublishThePost = (req, res) => {
  try {
    PostServices.unpublishThePost(req, res)
  } catch {
    res.status(400).send(CONSTANTS.UNPUBLISHED_FAILED)
  }
}

module.exports = {
  getAllPosts,
  addNewPost,
  deleteThePost,
  editThePost,
  getOnePost,
  getProfile,
  likeAndDislike,
  publishThePost,
  unpublishThePost
}
