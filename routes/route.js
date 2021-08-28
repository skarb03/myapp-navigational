const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('main/index', null);
});

router.post('/upload', function(req, res){
    console.log(req.file);
    console.log(req.body.comment);
    res.redirect('/');
});

module.exports = router;