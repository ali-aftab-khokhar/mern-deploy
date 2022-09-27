const Post = require('../schema/postSchema')
const CONSTANTS = require('../constants');
const User = require('../schema/userSchema');

const getPostsService = async (res) => {
    try {
        Post.find({}, function (err, doc) {
            if (!err) {
                res.status(200)
                res.json(doc)
            }
        })
    } catch {
        res.status(400)
    }
}

const addNewPostService = async (ownerName, ownerEmail, title, body, likes, res) => {
    try {
        const postDetails = new Post({
            ownerName: ownerName,
            title: title,
            body: body,
            ownerEmail: ownerEmail,
            likes: likes
        })
        await postDetails.save()
    } catch {
        res.status(400).send(CONSTANTS.PUBLISH_NEW_POST_FAILED)
    }
}

const deletePostService = async (id, res) => {
    try {
        await Post.findByIdAndDelete(id)
    } catch {
        res.status(400).send(CONSTANTS.DELETION_FAILED)
    }
}

const editPostService = async (id, title, body, res) => {
    try {
        await Post.findByIdAndUpdate(id, {
            title: title,
            body: body
        })
    } catch {
        res.status(400).send(CONSTANTS.EDIT_FAILED)
    }
}

const getOnePostService = async (req, res) => {
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

const getProfileDataService = async (id, res) => {
    try {
        User.findOne({ _id: id }, function (err, doc) {
            if (!err) {
                Post.find({ ownerEmail: doc.email }, function (p_err, p_doc) {
                    if (!p_err) {
                        res.status(200)
                        res.json(p_doc)
                    }
                })
            }
        })
    } catch {
        res.status(400)
    }
}

const likeAndDislikeService = async (req, res) => {
    try {
        if (req.body.todo === CONSTANTS.DISLIKE) {
            dislikeService(req, res)
        } else if (req.body.todo === CONSTANTS.LIKE) {
            likeService(req, res)
        }
    } catch {
        res.status(400)
    }
}

const dislikeService = (req, res) => {
    try {
        Post.findByIdAndUpdate(req.body.id,
            { "$pull": { likes: req.body.email } },
            { "new": true, "upsert": true },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(CONSTANTS.DISLIKED)
                }
            }
        );
    } catch {
        res.status(400).send(CONSTANTS.LIKE_DISLIKE_FAILED)
    }
}

const likeService = async (req, res) => {
    try {
        Post.findByIdAndUpdate(req.body.id,
            { "$push": { likes: req.body.email } },
            { "new": true, "upsert": true },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(CONSTANTS.LIKED)
                }
            }
        );
    } catch {
        res.status(400).send(CONSTANTS.LIKE_DISLIKE_FAILED)
    }
}

module.exports = { getPostsService, addNewPostService, deletePostService, editPostService, getOnePostService, getProfileDataService, likeAndDislikeService }