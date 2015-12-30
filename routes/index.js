var express = require('express');
var router = express.Router();
var home = require('../app/controllers/home.js');

router.get('/', function(req, res, next){
  home.homePage(req, res, next);
});

router.get('/test', function(req, res, next) {
  res.render('hi-tech', {
    title: '德阳锦江妇科医院',
    navPage: 'home',
    news: ''
  });
});

module.exports = router;
