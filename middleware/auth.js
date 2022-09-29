const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants')
const User = require('../schema/userSchema')

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)
        const user = await User.findOne({ _id: verifyToken._id })
        req.token = token
        req.user = user
        next()
    } catch {
        res.status(401).send(CONSTANTS.NOT_AUTH_NO_TOKEN)
    }
}

module.exports = auth