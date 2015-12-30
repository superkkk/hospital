var express = require('express');
var router = express.Router();
var home = require('../app/controllers/home.js');

router.get('/', function(req, res, next){
  home.homePage(req, res, next);
});

router.get('/category/:name/:sub_name', function(req, res, next) {
  res.render('category/'+ req.params.name + '/' + req.params.sub_name + '.ejs', {
    title: '德阳锦江妇科医院',
    nav: req.params.name,
    subNav: req.params.sub_name
  });
});

router.get('/category/:name', function(req, res, next) {
  var _tmp =  '';
  switch (req.params.name) {
    case 'yiyuanjieshao':
         _tmp = 'yinxiangjinjiang';
          break;
    case 'keshijieshao':
          _tmp = 'chankejieshao';
          break;
  }

  var tmp = '/category/'+ req.params.name + '/' + _tmp;
  res.redirect(tmp);
});


module.exports = router;
