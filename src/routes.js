const express = require('express')
const UserModel = require('./models/UserModel')
const jwt = require('./jwt')

const router = express.Router()

async function authMiddleware(req, res, next) {
    const [, token] = req.headers.authorization.split(' ')

    try {
        const payload = await jwt.verify(token)
        const user = UserModel.findByEmail(payload.user)

        if (!user) {
            return res.send(401)
        }


    } catch (error) {
        return res.send(401, error)
    }

    next()
}

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

router.get('/home', authMiddleware, async (req, res) => {
    try {
        const users = await UserModel.findAll()

        return res.send(users)
    } catch (error) {
        return res.send(error)
    }
})

module.exports = { router }