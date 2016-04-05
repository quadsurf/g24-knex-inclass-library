process.env.NODE_ENV = "test"

var locus = require("locus")
var expect = require('chai').expect;
var code = require('../app')
var request = require('supertest')
var knex = require('../db/knex');

beforeEach(function (done) {
  return knex.seed.run(knex.config).then(function() {
    done();
  });
});

afterEach(function(done) {
  knex('authors').del().then(()=> done());
});

describe("GET /authors", function () {
  it("shows all authors", function (done) {
    request(code.app)
      .get('/authors')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.status).to.eq(200);
        expect(res.text).to.include("/authors/1");
        expect(res.text).to.include("/authors/2");
        expect(res.text).to.include("/authors/3");
        knex('authors').then(function(authors) {
          expect(authors).to.be.defined;
          expect(authors.length).to.eq(3);
          expect(res.text.match(new RegExp(authors[0].name, 'g'))).to.be.defined;
          expect(res.text.match(new RegExp(authors[1].name, 'g'))).to.be.defined;
          expect(res.text.match(new RegExp(authors[2].name, 'g'))).to.be.defined;
          done();
        });
      });
  });
});

describe("GET /authors/1", function () {
  it("displays the show page with the correct author", function (done) {
    request(code.app)
      .get('/authors/1')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.text).to.include("bob")
        expect(res.status).to.eq(200)
        done();
      })
  })
})

describe("GET /authors/1/edit", function () {
  it("shows the edit page with the correct author", function (done) {
    request(code.app)
      .get('/authors/1/edit')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.text.toLowerCase()).to.include("/authors/1?_method=put")
        expect(res.text).to.include("/authors/1")
        expect(res.text).to.include("bob")
        expect(res.text).to.include(22)
        expect(res.status).to.eq(200)
        done();
      })
  })
})

describe("GET /authors/new", function () {
  it("shows the new page", function (done) {
    request(code.app)
      .get('/authors/new')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.text.toLowerCase()).to.include(("/authors").trim())
        expect(res.text.replace(/\s+/g,"").trim().toLowerCase()).to.include(('method="post"'))
        expect(res.status).to.eq(200)
        done();
      })
  })
})

describe("POST /authors", function () {
  it("adds a new author", function (done){
    var newAuthor = {
      author: {
        name: "test",
        age: 45
      }
    }
    request(code.app)
      .post('/authors')
      .type('form')
      .send(newAuthor)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.redirect).to.eq(true)
        expect(res.status).to.eq(302)
        request(code.app)
          .get('/authors')
          .end(function(err,res){
            expect(res.text).to.include("test")
            expect(res.text).to.include(45)
            expect(res.text.match(/\/authors\/\d+/g).length).to.eq(4)
            done();
          })
      })
  })
})

describe("PUT /authors/1", function () {
  it("updates an existing author", function (done) {
    var updatedAuthor = {
      author: {
        name: "Kurt Vonnegut",
        age: 94
      }
    }
    request(code.app)
      .put('/authors/1')
      .type('form')
      .send(updatedAuthor)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.redirect).to.eq(true)
        expect(res.status).to.eq(302)
        request(code.app)
          .get('/authors')
          .end(function(err,res){
            expect(res.text).to.include("Kurt Vonnegut")
            expect(res.text).to.include(94)
            expect(res.text).to.not.include("bob")
            expect(res.text).to.not.include(22)
            expect(res.text.match(/\/authors\/\d+/g).length).to.eq(3)
            done();
          })
      })
  })
})

describe("DELETE /authors/1", function () {
  it("deletes an author", function (done) {
    request(code.app)
      .delete('/authors/1')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.redirect).to.eq(true)
        expect(res.status).to.eq(302)
        request(code.app)
          .get('/authors')
          .end(function(err,res){
            expect(res.text.match(/\authors\/1/)).to.equal(null)
            expect(res.text).to.not.include("bob")
            expect(res.text).to.not.include(22)
            expect(res.text).to.include("/authors/2")
            expect(res.text).to.include("/authors/3")
            expect(res.text.match(/\/authors\/\d+/g).length).to.eq(2)
            done();
          })
      })
  })
})

describe("404 page", function () {
  it("has a 404 page", function (done) {
    request(code.app)
      .get('/randompage')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.status).to.eq(404)
        done();
      })
  })
})
