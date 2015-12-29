var express = require('express');
var router = express.Router();
var home = require('../app/controllers/home.js');

router.get('/', function(req, res, next){
  home.homePage(req, res, next);
});

module.exports = router;
