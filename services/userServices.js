const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants')
const createHttpError = require("http-errors");

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await existsOrNot(email)
        const isMatch = existingUser && (await bcrypt.compare(password, existingUser.password))
        const token = await existingUser.generateToken()
        res.cookie(CONSTANTS.JWT, token, {
            expiresIn: new Date(Date.now() + 50000),
            httpOnly: true,
            secure: true
        })
        if (isMatch) {
            res.status(200)
            res.json({
                _id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            })
        }
        else {
            res.status(400)
            res.send(CONSTANTS.INCORRECT_EMAIL_OR_PASSWORD)
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await existsOrNot(email)
        if (existingUser) {
            res.status(400)
            throw new Error(CONSTANTS.USER_ALREADY_EXISTS)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        const token = await user.generateToken()
        res.cookie('jwt', token, {
            expiresIn: new Date(Date.now() + 30000),
            httpOnly: true
        })
        await user.save()
        if (user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
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

const logout = async (req, res) => {
    try {
        res.clearCookie(CONSTANTS.JWT)
        await req.user.save()
        res.status(200)
    } catch {
        res.status(400).send(CONSTANTS.LOGOUT_FAILED)
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

module.exports = {
    login,
    register,
    logout
}