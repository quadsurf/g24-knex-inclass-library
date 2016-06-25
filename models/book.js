//disabled
var bookshelf = require('../db/bookshelf');

var Book = bookshelf.Model.extend({
  tableName: 'books',
  author: function() {
    return this.hasOne(Author);
  }
});

module.exports = Book;
