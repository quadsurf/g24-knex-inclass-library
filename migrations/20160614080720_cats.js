exports.up = function(knex, Promise) {
  return knex.schema.createTable('cats', function(table) {
    table.increments().primary();
    table.string('name');
    table.string('about');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cats')
};
