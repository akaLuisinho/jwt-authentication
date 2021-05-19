const express = require('express')
const UserModel = require('./models/UserModel')
const jwt = require('./jwt')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, name, password } = req.body
    try {
        const user = await UserModel.create(email, name, password)

        const token = jwt.sign({ user: user.email })

        return res.send({ user, token })
    } catch (error) {
        return res.send(error)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.verify(email, password)

        if (user == 400) {
            return res.status(400).send('email ou senha incorreto')
        } else if (user == 401) {
            return res.send(401).send('nao autorizado')
        }

        const token = jwt.sign({ user: user.email })

        return res.send({ user, token })
    } catch (error) {
        return res.send(error)
    }
})

module.exports = { router }