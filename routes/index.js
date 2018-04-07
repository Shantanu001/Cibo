var express = require('express');
var router = express();
var request = require('request');
router.get('/',function(req,res){
    res.render('index.ejs',{restaurant_lists:""});
});
const obj = {
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=2&entity_type=city',
    method: 'GET',
    headers: {  
        "user-key":'e9aca94aa82bdb0e3aae357371dd2958'
    }

};
router.post('/',function(req,res){
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
                    url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+city_id+'&entity_type=city&start=0&count=100',
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


                        let rest_lists = f;
                        res.render('index',{restaurant_lists:rest_lists});

                    }
                });

            }
        }
    });

});
module.exports = router;