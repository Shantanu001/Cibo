var express = require('express');
var router = express();
var url = require('url');
var loc="";
var start="";
let city="";
var request = require('request');
const obj = {
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=2&entity_type=city',
    method: 'GET',
    headers: {  
        "user-key":'e9aca94aa82bdb0e3aae357371dd2958'
    }

};
router.get('/',function(req,res){
    res.render('index.ejs',{restaurant_lists:""});
});
router.get('/index',function(req,res){
    loc =  url.parse(req.url,true).query.city;
    start = url.parse(req.url,true).query.start;
    const obj1 = {
        url: 'https://developers.zomato.com/api/v2.1/cities?q='+loc,
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
            let city_detail = JSON.parse(body);
            for(i in city_detail.location_suggestions)
            {
                //console.log(city_id.location_suggestions[i].id);
                let city_ids = city_detail.location_suggestions[i].id;

                const obj = {
                    url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+city_ids+'&entity_type=city&start='+start+'&count=20',
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
                        let info = JSON.parse(body);


                        let lists = info;
                        res.render('index',{restaurant_lists:lists});

                    }
                });

            }
        }
    });
});

module.exports = router;