var bookshelf = require('../db/bookshelf');

var Author = bookshelf.Model.extend({
  tableName: 'authors',
  books: function() {
    return this.hasMany(Book);
  }
});

var Book = bookshelf.Model.extend({
  tableName: 'books',
  author: function() {
    return this.hasOne(Author);
  }
});

module.exports = {
  author: Author,
  book: Book
};
