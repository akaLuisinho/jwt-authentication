const knex = require('../database/index.js')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')

async function create(email, name, password) {
    const id = uuid();
    console.log(id);
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

module.exports = { create }