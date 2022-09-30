const Post = require('../schema/postSchema')
const CONSTANTS = require('../constants')
const User = require('../schema/userSchema')

const getAllPosts = async (res) => {
  try {
    Post.find({ status: CONSTANTS.PUBLISHED }, function (err, doc) {
      if (!err) {
        res.status(200)
        res.json(doc)
      }
    })
  } catch {
    res.status(400)
  }
}

const addNewPost = async (ownerName, ownerEmail, title, body, likes, status, res) => {
  try {
    const postDetails = new Post({
      ownerName,
      title,
      body,
      ownerEmail,
      likes,
      status
    })
    await postDetails.save()
  } catch {
    res.status(400).send(CONSTANTS.PUBLISH_NEW_POST_FAILED)
  }
}

const deleteThePost = async (id, res) => {
  try {
    await Post.findByIdAndDelete(id)
  } catch {
    res.status(400).send(CONSTANTS.DELETION_FAILED)
  }
}

const editThePost = async (id, title, body, res) => {
  try {
    await Post.findByIdAndUpdate(id, {
      title,
      body
    })
  } catch {
    res.status(400).send(CONSTANTS.EDIT_FAILED)
  }
}

const getOnePost = (req, res) => {
  try {
    Post.find({ _id: req.params.id }, function (err, doc) {
      if (!err) {
        res.status(200)
        res.send(doc)
      }
    })
  } catch {
    res.status(400).send(CONSTANTS.CANT_GET_INDIVIDUAL_POST)
  }
}

const getProfile = (id, res) => {
  try {
    User.findOne({ _id: id }, function (err, doc) {
      if (!err) {
        Post.find({ ownerEmail: doc.email }, function (pErr, pDoc) {
          if (!pErr) {
            res.status(200)
            res.json(pDoc)
          }
        })
      }
    })
  } catch {
    res.status(400)
  }
}

const likeAndDislike = (req, res) => {
  try {
    if (req.body.todo === CONSTANTS.DISLIKE) {
      dislike(req, res)
    } else if (req.body.todo === CONSTANTS.LIKE) {
      like(req, res)
    }
  } catch {
    res.status(400)
  }
}

const dislike = (req, res) => {
  try {
    Post.findByIdAndUpdate(req.body.id,
      { $pull: { likes: req.body.email } },
      { new: true, upsert: true },
      function (err, doc) {
        if (!err) {
          res.status(200).send(CONSTANTS.DISLIKED)
        }
      }
    )
  } catch {
    res.status(400).send(CONSTANTS.LIKE_DISLIKE_FAILED)
  }
}

const like = (req, res) => {
  try {
    Post.findByIdAndUpdate(req.body.id,
      { $push: { likes: req.body.email } },
      { new: true, upsert: true },
      function (err, doc) {
        if (!err) {
          res.status(200).send(CONSTANTS.LIKED)
        }
      }
    )
  } catch {
    res.status(400).send(CONSTANTS.LIKE_DISLIKE_FAILED)
  }
}

const publishThePost = (req, res) => {
  try {
    Post.updateOne({ _id: req.body.id },
      { $set: { status: CONSTANTS.PUBLISHED } },
      function (err, doc) {
        if (!err) {
          res.status(200).send(CONSTANTS.PUBLISHED)
        }
      }
    )
  } catch {
    res.status(400).send(CONSTANTS.PUBLISHED_FAILED)
  }
}

const unpublishThePost = (req, res) => {
  try {
    Post.updateOne({ _id: req.body.id },
      { $set: { status: CONSTANTS.NOT_PUBLISHED } },
      function (err, doc) {
        if (!err) {
          res.status(200).send(CONSTANTS.NOT_PUBLISHED)
        }
      }
    )
  } catch {
    res.status(400).send(CONSTANTS.UNPUBLISHED_FAILED)
  }
}

module.exports = { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike, publishThePost, unpublishThePost }
