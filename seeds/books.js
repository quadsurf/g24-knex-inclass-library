
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('books').del(),

    // Inserts seed entries
    knex('books').insert({title: '', author_id: , cat_id: }),
    knex('books').insert({title: '', author_id: , cat_id: }),
    knex('books').insert({title: '', author_id: , cat_id: })
  );
};
