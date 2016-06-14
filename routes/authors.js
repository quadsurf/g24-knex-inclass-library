var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Knex = function() {
  return knex('authors');
}

//READ ALL
router.get('/',function(req,res){
  Knex().then(function(result,err){
    // console.log(result);
    res.render('authors/index',{authors:result});
  })
})

//CREATE
router.get('/new',function(req,res){
  res.render('authors/new');
});

  // post to authors
router.post('/',function(req,res){
  // get form data
  var author = req.body;
  // insert data to db
  Knex().insert({
    name: author.name,
    age: author.age
  }).then(function(result,err){
    // redirect to /authors
    res.redirect('/authors')
  });
});

// READ ONE
router.get('/:id',function(req,res){
  // get ID from params
  var authorId = req.params.id

  // query database for the ID
  Knex().where('id',authorId).first().then(function(result,err){
    var author = result;
    res.render('authors/show',{author:author});
  })
});

// UPDATE PART 1
router.get('/:id/edit',function(req,res){
  // get ID from params
  var authorId = req.params.id;
  // query DB for the ID
  Knex().where('id',authorId)
  .first()
  // render edit page with author details
  .then((result,err) => {
    var author = result;
    res.render('authors/edit', {author:author});
  })

});

// UPDATE PART 2
router.post('/:id', (req,res) => {
  // get form info from req.body
  var name = req.body.name,
      id = req.params.id,
      age = req.body.age;
  // update db with form info and param.id
  Knex().where('id', id).update({
    name: name,
    age: age
  }, 'id')
  // redirect to author show page
  .then((result,err) => {
    res.redirect('/authors/'+id);
  })
});

// DELETE PART 2
router.delete('/:id', (req,res) => {
  //get info from req.params
  var authorId = req.params.id;
  //update db with form info and param id
  Knex().where('id', authorId)
  .first()
  .del()
  //redirect to authors read all page
  .then((result,err) => {
    res.send(200).end();
  })
})




module.exports = router;
