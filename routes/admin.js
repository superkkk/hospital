var express = require('express');
var router = express.Router();
var admin = require('../app/controllers/admin.js');
var logger = require('../config/log.js').logger;
var multiparty = require('multiparty');


router.get('/', function(req, res, next){
  admin.index(req, res, next);
});
router.get('/:page', function(req, res, next){
  admin.index(req, res, next);
});

router.route('/news')
  .post(function(req, res, next){
    admin.saveNews(req, res, next);
  });

router.route('/news/:id?')
  .get(function(req, res, next){
    admin.getNews(req, res, next);
  })
  .post(function(req, res, next){
    admin.saveNews(req, res, next);
  })
  .delete(function(req, res, next){
    admin.deleteNews(req, res, next);
  });
router.post('/uploadImage', function(req, res, next){
  var form = new multiparty.Form({uploadDir: './public/upload'});

  form.parse(req, function(err, fields, files) {
    if(err){
      console.log(err);
    }
    console.log(fields, files.headers);
    var filename = files.file[0].path.substr(files.file[0].path.lastIndexOf('/') + 1);
    res.send(filename);
  });
});
module.exports = router;
