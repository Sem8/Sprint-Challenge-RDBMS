
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(actions) {
        actions.increments();

        actions.string('description', 128).notNullable();
        actions.text('notes').notNullable();
        actions.boolean('completed').defaultTo(false);
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');  
};
