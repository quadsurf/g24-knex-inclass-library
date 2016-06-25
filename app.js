var express = require("express"),
    app = express(),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

require('locus');

app.set('view engine','ejs');
app.set('views', ( __dirname + '/views' ));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

// app.use('/authors', routes.authors);
var authorsRoutes = require('./routes/authors');
app.use('/authors',authorsRoutes);

// authors/4/books/2/edit THIS IS RESTful!

// app.use('/authors/:author_id/books', routes.books);
// 2nd arg routes.books is better than authorsRoutes setup
var booksRoutes = require('./routes/books');
app.use('/authors/:author_id/books',booksRoutes);

var catRoutes = require('./routes/cats');
app.use('/cats',catRoutes);


app.listen(5000,function(){
  console.log('listening on port 5000');
})



module.exports = {
  app
}
