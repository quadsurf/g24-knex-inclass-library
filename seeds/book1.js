
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('books').del(),

    // Inserts seed entries
    knex('books').insert({
      title: 'Harry Potter and the Sorcerer\'s Stone',
      about: 'Adaptation of the first of J.K. Rowling\'s popular childrens novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents\' mysterious deaths.',
      imgurl: 'http://bit.ly/1SjVx6I',
      author_id: 17,
      cats_id: 1
    })
  );
};



// exports.seed = function(knex, Promise) {
//   return Promise.join(
//     // Deletes ALL existing entries
//     knex('books').del(),
//
//     // Inserts seed entries
//     knex('books').insert({title: '', author_id: , cat_id: }),
//     knex('books').insert({title: '', author_id: , cat_id: }),
//     knex('books').insert({title: '', author_id: , cat_id: })
//   );
// };
