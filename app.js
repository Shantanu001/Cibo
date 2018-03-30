var express = require('express');
var bodyParser = require('body-parser');
var zomato = require('zomato');
var request = require('request');
var app = express();
var path = require('path');
//let url = 'https://developers.zomato.com/api/v2.1/cities?q=kolkata';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
         extended:true
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

const obj = {
  url: 'https://developers.zomato.com/api/v2.1/search?entity_id=2&entity_type=city',
  method: 'GET',
  headers: {
      "user-key":'e9aca94aa82bdb0e3aae357371dd2958'
  }
    
};
app.get('/',function(req,res){
    res.render('index.ejs',{rest_list:""});
});

app.post('/',function(req,res){
    let city = req.body.city;
const obj1 = {
  url: 'https://developers.zomato.com/api/v2.1/cities?q='+city,
  method: 'GET',
  headers: {
      "user-key":'e9aca94aa82bdb0e3aae357371dd2958'
  }
    
};
request(obj1,function(err,response,body){
    if(err)
        {
             console.log(err);
            /*for(i in body.restaurants)
            {console.log(body.restaurants[i]);}*/
        }
    else
        {
            let city_details = JSON.parse(body);
            for(i in city_details.location_suggestions)
            {
                //console.log(city_id.location_suggestions[i].id);
                let city_id = city_details.location_suggestions[i].id;
                
  
                
                const obj = {
  url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+city_id+'&entity_type=city',
  method: 'GET',
  headers: {
      "user-key":'e9aca94aa82bdb0e3aae357371dd2958'
  }
    
};
                request(obj,function(err,response,body){
    if(err)
        {
            console.log(err);
        }
    else
        {
             let f = JSON.parse(body);
             for(i in f.restaurants)
             console.log(f.restaurants[i].restaurant.featured_image);
             let rest_lists = f;
             res.render('index',{rest_list:rest_lists});
             
        }
});
                
            }
        }
});

});
app.listen(8080);
console.log("Server started at 8080");
//console.log("hello");