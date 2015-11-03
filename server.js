var express =           require('express'),
    path =              require('path'),
    routes =            require('./routes'),
    exphbs =            require('express-handlebars'),
    morgan =            require('morgan');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(morgan('dev'));
app.use('/', routes.index);

// Send the index.html file down
//app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
//});

app.listen(port);
console.log("Server listening on port " + port);