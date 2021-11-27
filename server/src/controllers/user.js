const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/protectedRoute')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route GET /auth ------------------------------
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User is not found'
            })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST auth/register ------------------------------
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, name, password } = req.body

    // Validation about missing information
    if (!username) {
        return res.status(400).json({
            success: false,
            message: 'Missing username!'
        })
    } else if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Missing name!'
        })
    } else if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Missing password!'
        })
    }

    //Validation in database [VIB]
    try {
        // VIB: Existing username
        const user = await User.findOne({ username })

        if (user)
            return res.status(400).json({
                success: false,
                message: 'Username is already taken!'
            })

        // Passing all validation
        const newUser = new User({ username, name, password })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'Account is created successfully!',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error!'
        })
    }
})

// @route POST /auth/login ------------------------------
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // Validation about missing infomation
    if (!username) {
        return res.status(400).json({
            success: false,
            message: 'Missing username!'
        })
    } else if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Missing password!'
        })
    }

    //Validation in database [VIB]
    try {
        // VIB: Incorrect information
        const user = await User.findOne({ username, password })
        if (!user || !password) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect information!'
            })
        } 

        // Passing all validation
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'Login successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = router