var express = require("express"),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    routes = require("./routes");

app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/authors', routes.authors);

//Home
app.get('/', function(req, res){
  res.render('home');
});

app.get('*', function(req,res){
  res.render('errors/404');
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
