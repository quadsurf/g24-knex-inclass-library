
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cats').del(),

    // Inserts seed entries
    knex('cats').insert({name: ''}),
    knex('cats').insert({name: ''}),
    knex('cats').insert({name: ''})
  );
};
