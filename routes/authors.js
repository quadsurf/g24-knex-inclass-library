var express = require("express");
var router = express.Router();
var knex = require("../db/knex");

// Index
router.get('/', function(req, res){
  knex('authors').then(function(author){
    res.render('authors/index', {authors: author});
  });
});

// New
router.get('/new', function(req, res){
  res.render("authors/new");
});

// Create
router.post('/', function(req, res) {
  knex('authors').insert(req.body.author).then(function(){
    res.redirect('/authors');
  });
});

// Show
router.get('/:id', function(req, res) {
  knex('authors').where({id: req.params.id}).first().then(function(author){
      res.render('authors/show', {author:author});
  });
});

// Edit
router.get('/:id/edit', function(req, res) {
  knex('authors').where({id: req.params.id}).first().then(function(author){
    res.render('authors/edit', {author: author});
  });
});

// Update
router.put('/:id', function(req, res) {
  knex('authors').where({id: req.params.id}).update(req.body.author).then(function(){
      res.redirect('/authors');
  });
});

// Destroy
router.delete('/:id', function(req, res) {
  knex('authors').where({id: req.params.id}).del().then(function(){
      res.redirect('/authors');
  });
});

module.exports = router;