//disabled
var bookshelf = require('../db/bookshelf');

var Author = bookshelf.Model.extend({
  tableName: 'authors',
  books: function() {
    return this.hasMany(Book);
  }
});

module.exports = Author;
