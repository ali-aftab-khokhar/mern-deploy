const express = require('express')
const router = express.Router()
const {login, register} = require('../controllers/userController')

router.post('/api', login)

router.post('/api/register', register);

module.exports = router