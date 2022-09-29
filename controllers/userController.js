const CONSTANTS = require('../constants')
const UserServices = require('../services/userServices')

const login = async (req, res) => {
    try {
        await UserServices.login(req, res)
    } catch {
        res.status(400).send(CONSTANTS.LOGIN_FAILED)
    }
}

const register = async (req, res) => {
    try {
        await UserServices.register(req, res)
    } catch {
        res.status(400).send(CONSTANTS.SIGNUP_FAILED)
    }
}

const logout = async (req, res) => {
    try {
        UserServices.logout(req, res)
    } catch {
        res.status(400).send(CONSTANTS.LOGOUT_FAILED)
    }
}

module.exports = {
    login,
    register,
    logout
}