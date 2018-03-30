var express = require('express');
var router = express();
var request = require('request');
router.get('/about',function(req,res){
    res.render('about');
    res.send(req.query);
});

module.exports = router;