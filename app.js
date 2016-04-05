var express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('common'));
app.set('view engine', 'jade');

app.use('/authors', require('./routes/authors'));

app.listen(3000, function() {
  console.log("Listening on port 3000");
});

module.exports = {
  app
}