var express = require("express"),
    app = express(),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

require('locus');

app.set('view engine','ejs');
app.set('views', ( __dirname+ '/views' ));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));


var authorsRoutes = require('./routes/authors');
app.use('/authors',authorsRoutes);


app.listen(3000,function(){
  console.log('listening on some port');
})



module.exports = {
  app
}
