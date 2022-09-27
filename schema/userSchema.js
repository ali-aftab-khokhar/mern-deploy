const mongoose = require('mongoose')
const validator = require('validator')
const CONSTANTS = require('../constants')
const type = require('../dataType')

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
})

const Users = mongoose.model(CONSTANTS.USERS_SCHEMA, userSchema)
module.exports = Users