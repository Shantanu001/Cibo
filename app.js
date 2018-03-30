var express = require('express');
var bodyParser = require('body-parser');
var zomato = require('zomato');
var app = express();
var path = require('path');
var index = require('./routes/index');
var about = require('./routes/about');
//let url = 'https://developers.zomato.com/api/v2.1/cities?q=kolkata';
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
         extended:true
}));
app.use('/',index);
app.use('/about',about);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/about',function(req,res){
    res.render('about');
});


app.listen(8080);
console.log("Server started at 8080");
//console.log("hello");