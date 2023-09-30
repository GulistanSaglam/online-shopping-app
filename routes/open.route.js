const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    res.render('auth/prod');
});

router.get('/401', function(req,res){
    res.status(401).render('sharing/401');
});

router.get('/403', function(req,res){
    res.status(403).render('sharing/403');
});



module.exports = router;