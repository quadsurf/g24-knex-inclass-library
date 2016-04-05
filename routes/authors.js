var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('authors').then(function(authors) {
    res.render('authors/index', {authors});
  });
});

router.get('/new', function(req, res) {
  res.render('authors/new');
});

router.get('/:id', function(req, res) {
  knex('authors').where('id', req.params.id).then(function(authors) {
    if (authors.length) {
      res.render('authors/show', {author: authors[0]});
    } else {
      res.status(404).send('error');
    }
  })
});

router.get('/:id/edit', function(req, res) {
  knex('authors').where({id: req.params.id}).then(function(authors) {
    if (authors.length) {
      res.render('authors/edit', {author: authors[0]});
    } else {
      res.status(404).send("error");
    }
  });
});

router.post('/', function(req, res) {
  if (req.body.author && req.body.author.name &&
      req.body.author.age) {
    var promise = knex('authors').insert({name: req.body.author.name,
                                          age: req.body.author.age});
    promise.then(function() {
      res.redirect("/authors");
    }).catch(function(error) {
      res.status(500).send("Could not create author", error);
    });
  } else {
    res.status(404).send("erorr");
  }
});

router.put('/:id', function(req, res) {
  if (req.body.author) {
    var updatedAuthor = {name: req.body.author.name,
                         age: req.body.author.age};
    var promise = knex('authors').update(updatedAuthor)
                                 .where({id: req.params.id});
    promise.then(function() {
      res.redirect('/authors');
    }).catch(function() {
      res.status(500).send("Could not update author");
    })
  } else {
    res.status(404).send("erorr");
  }
});

router.delete('/:id', function(req, res) {
  knex('authors').where({id: req.params.id}).del().then(function() {
    res.redirect('/authors');
  }).catch(function() {
    res.status(404).send('erorr');
  })
});

module.exports = router;
