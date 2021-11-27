const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/protectedRoute')
const LinkCard = require('../models/LinkCard')

module.exports = router