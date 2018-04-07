var express = require('express');
var router = express();
var url = require('url');
var request = require('request');
var q="";
images = [{image:"/image/background.png"}];
router.get('/',function(req,res){
    q = url.parse(req.url,true).query.id;
    //console.log(q);
    let details;
    let review;
    const obj = {
        url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+q,
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
            console.log(q);
            details = JSON.parse(body);
            //console.log(details); 
            const obj = {
                url: 'https://developers.zomato.com/api/v2.1/reviews?res_id='+q,
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
                    review= JSON.parse(body);
                    console.log(review);
                } 
            });
            console.log(details);
            console.log(details.events_url);
            res.render('about.ejs',{restaurant_id:details});
        }
    });

});
module.exports = router;