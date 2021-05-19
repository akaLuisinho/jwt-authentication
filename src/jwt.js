const jwt = require('jsonwebtoken')

const secret = 'hopscotch'

sign = (payload) => jwt.sign(payload, secret, { expiresIn: 86400 })

verify = (token) => jwt.verify(token, secret)

module.exports = { sign, verify }