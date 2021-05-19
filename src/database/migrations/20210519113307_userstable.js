
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').notNullable().primary()
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('password').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
