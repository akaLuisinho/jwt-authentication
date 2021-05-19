const knex = require('../database/index.js')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')

async function create(email, name, password) {
    const id = uuid();
    const user = {
        id: id,
        email: email,
        name: name,
        password: password,
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    await knex('users')
        .insert({ id: user.id, email: user.email, name: user.name, password: hashedPassword })

    return user
}
async function verify(email, password) {
    const bdUser = await knex('users')
        .where('email', email)

    const user = {
        ...bdUser[0]
    }

    if (!user.email) {
        return 400
    }

    const passwdValidation = await bcrypt.compare(password, user.password)

    if (passwdValidation) {
        return user
    } else {
        return 401
    }
}

module.exports = { create, verify }