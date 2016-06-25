exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments().primary();
    table.string('title');
    table.text('about');
    table.string('imgurl');
    table.integer('author_id').unsigned().index().references('authors.id');
    table.integer('cats_id').unsigned().index().references('cats.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
