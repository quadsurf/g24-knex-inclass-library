var express = require("express");
var router = express.Router({mergeParams:true});
var knex = require("../db/knex");

// Index
router.get('/', function(req, res){
  //left outer join works too
  knex('authors').where({id:req.params.author_id}).first().then(function(author){
    knex('books').where({author_id:author.id}).then(function(books){
        res.render('books/index', {author: author,books: books});
    });
  });
});

// New
router.get('/new', function(req, res){
  var id = req.params.author_id;
  res.render('books/new', {id:id});
});

// Create
router.post('/', function(req, res) {
  var author_id = req.params.author_id;
  var title = req.body.book.title;
  var genre = req.body.book.genre;
  knex('books').insert({
    title: title,
    genre:genre,
    author_id: author_id
  }).then(function(book){
      res.redirect('/authors/' + author_id + '/books');
  });
});

// Show
router.get('/:id', function(req, res) {
  knex('books').where({id: req.params.id}).first().then(function(book){
    res.render('books/show', {book: book});
  });
});

// Edit
router.get('/:id/edit', function(req, res) {
  knex('books').where({id: req.params.id}).first().then(function(book){
    res.render('books/edit', {book: book});
  });
});

// Update
router.put('/:id', function(req, res) {
    knex('books').where({id: req.params.id}).first().update(req.body.book).then(function(book){
        // could also do .returning('author_id') or .returning('author_id').first().id to get the author for redirecting
        res.redirect('/authors/' + req.params.author_id + '/books');
    });
});

// Destroy
router.delete('/:id', function(req, res) {
  knex('books').where({id: req.params.id}).del().then(function(book){
      res.redirect('/authors/' + req.params.author_id + '/books');
    });
});

module.exports = router;
