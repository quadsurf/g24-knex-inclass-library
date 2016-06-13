exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table) {
    table.increments();
    table.string('name');
    table.integer('age');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors')
};
