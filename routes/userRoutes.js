const express = require('express')
const router = express.Router()
const { login, register, logout } = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/', login)

router.post('/register', register)

router.get('/logout', auth, logout)

module.exports = router
