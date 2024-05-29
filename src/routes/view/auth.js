'use strict'

const router = require('express').Router()

const auth = require('../../controllers/view/auth')

router.all('/login', auth.login)
router.all('/logout', auth.logout)

module.exports = router