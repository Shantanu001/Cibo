var express = require('express');
var bodyParser = require('body-parser');
var zomato = require('zomato');
//var request = require('request');
var app = express();
let city = 'kolkata';
//let url = 'https://developers.zomato.com/api/v2.1/cities?q=kolkata';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
         extended:true
}));
var client = zomato.createClient({
    userKey : 'e9aca94aa82bdb0e3aae357371dd2958'
});
client.search({
entity_id:2,//location id 
entity_type:city // location type (city,subzone,zone , landmark, metro,group)  
 
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
app.listen(8080);
console.log("Server started at 8080");
//console.log("hello");