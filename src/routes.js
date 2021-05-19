const express = require('express')

const UserModel = require('./models/UserModel')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, name, password } = req.body
    try {
        const user = await UserModel.create(email, name, password)
        return res.send(user)
    } catch (error) {
        return res.send(error)
    }
})

module.exports = { router }