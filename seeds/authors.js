exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('authors').del(),
    knex('authors').insert({id: 1, name: 'bob', age: 22}),
    knex('authors').insert({id: 2, name: 'tom', age: 32}),
    knex('authors').insert({id: 3, name: 'jane', age: 42}),
  ]);
};
