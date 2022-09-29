const mongoose = require('mongoose')
const validator = require('validator')
const CONSTANTS = require('../constants')
const type = require('../dataType')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: type.string,
        required: [true, CONSTANTS.ENTER_NAME]
    },
    email: {
        type: type.string,
        required: [true, CONSTANTS.ENTER_EMAIL],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: type.string,
        required: [true, CONSTANTS.ENTER_PASSWORD]
    },
    tokens: [{
        token: {
            type: type.string,
            required: true
        }
    }]
})

userSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token
    } catch {
        console.log(CONSTANTS.GENERATE_TOKEN_FAILED)
    }
}

const Users = mongoose.model(CONSTANTS.USERS_SCHEMA, userSchema)
module.exports = Users