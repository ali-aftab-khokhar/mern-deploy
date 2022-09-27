const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants')

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await existsOrNot(email)
        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            res.status(200)
            res.json({
                _id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                token: generateToken(existingUser._id),
            })
        }
        else {
            res.status(400)
            throw new Error(CONSTANTS.INCORRECT_EMAIL_OR_PASSWORD)
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const registerService = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await existsOrNot(email)
        if (existingUser) {
            res.status(400)
            throw new Error(CONSTANTS.USER_ALREADY_EXISTS)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        if (user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error(CONSTANTS.INVALID_USER_DATA)
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const existsOrNot = async (email) => {
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return userExists
        } else {
            return false
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

module.exports = {
    loginService,
    registerService
}