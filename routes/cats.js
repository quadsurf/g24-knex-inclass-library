var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Knex = function() {
  return knex('cats');
}

//READ ALL
router.get('/',function(req,res){
  Knex().then(function(result,err){
    // console.log(result);
    res.render('cats/index',{cats:result});
  })
})

//CREATE
router.get('/new',function(req,res){
  res.render('cats/new');
});

  // post to cats
router.post('/',function(req,res){
  // get form data
  var cat = req.body;
  // insert data to db
  Knex().insert({
    name: cat.name,
    about: cat.about
  }).then(function(result,err){
    // redirect to /cats
    res.redirect('/cats')
  });
});

// READ ONE
router.get('/:id',function(req,res){
  // get ID from params
  var catId = req.params.id

  // query database for the ID
  Knex().where('id',catId).first().then(function(result,err){
    var cat = result;
    res.render('cats/show',{cat:cat});
  })
});

// UPDATE PART 1
router.get('/:id/edit',function(req,res){
  // get ID from params
  var catId = req.params.id;
  // query DB for the ID
  Knex().where('id',catId)
  .first()
  // render edit pabout with cat details
  .then((result,err) => {
    var cat = result;
    res.render('cats/edit', {cat:cat});
  })

});

// UPDATE PART 2
router.post('/:id', (req,res) => {
  // get form info from req.body
  var name = req.body.name,
      id = req.params.id,
      about = req.body.about;
  // update db with form info and param.id
  Knex().where('id', id).update({
    name: name,
    about: about
  }, 'id')
  // redirect to cat show pabout
  .then((result,err) => {
    res.redirect('/cats/'+id);
  })
});

// DELETE PART 2
router.delete('/:id', (req,res) => {
  //get info from req.params
  var catId = req.params.id;
  //update db with form info and param id
  Knex().where('id', catId)
  .first()
  .del()
  //redirect to cats read all pabout
  .then((result,err) => {
    res.send(200).end();
  })
})




module.exports = router;
