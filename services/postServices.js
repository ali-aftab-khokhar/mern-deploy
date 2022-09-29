const Post = require('../schema/postSchema')
const CONSTANTS = require('../constants');
const User = require('../schema/userSchema');

const getAllPosts = async (res) => {
    try {
        Post.find({ status: "published" }, function (err, doc) {
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
            ownerName: ownerName,
            title: title,
            body: body,
            ownerEmail: ownerEmail,
            likes: likes,
            status: status
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
            title: title,
            body: body
        })
    } catch {
        res.status(400).send(CONSTANTS.EDIT_FAILED)
    }
}

const getOnePost = async (req, res) => {
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

const getProfile = async (id, res) => {
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

const likeAndDislike = async (req, res) => {
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

const dislike = async (req, res) => {
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

const like = async (req, res) => {
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

const publishThePost = async (req, res) => {
    try {
        Post.updateOne({ _id: req.body.id },
            { "$set": { status: CONSTANTS.PUBLISHED } },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(CONSTANTS.PUBLISHED)
                }
            }
        );
    } catch {
        res.status(400).send(CONSTANTS.PUBLISHED_FAILED)
    }
}

const unpublishThePost = async (req, res) => {
    try {
        Post.updateOne({ _id: req.body.id },
            { "$set": { status: CONSTANTS.NOT_PUBLISHED } },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(CONSTANTS.NOT_PUBLISHED)
                }
            }
        );
    } catch {
        res.status(400).send(CONSTANTS.UNPUBLISHED_FAILED)
    }
}

module.exports = { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike, publishThePost, unpublishThePost }