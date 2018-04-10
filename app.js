var jQuery = require('jquery');
var express = require('express');
var bodyParser = require('body-parser');
var zomato = require('zomato');
var app = express();
const port = process.env.PORT||8080;
var path = require('path');
var index = require('./routes/index');
var about = require('./routes/about');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use('/',index);
app.use('/about',about);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.listen(port);
console.log("Server started at 8080");
//console.log("hello");