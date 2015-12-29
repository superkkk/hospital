'use strict';
var News = require('../models/news'),
  then = require('thenjs/then'),
  logger = require('../../config/log.js').logger;

module.exports.index = function(req, res, next){

  var active = req.params.page || 'news';

  if(active == 'news'){
    then(function(cont){
      News.getByPage(20, 0, function(err, data){
        logger.debug(data);
        cont(err, data);
      });
    }).then(function(cont,news){
      res.render('admin/index',
        {
          active: active,
          news: news
        });
    }).fail(function (cont, err) {
      console.error(err);
    });
  } else{
    res.render('admin/index',
      {
        active: active
      });
  }
};

module.exports.saveNews =function(req, res, next){
  var data = {
    title : req.body.title,
    content : req.body.content,
    id: req.params.id
  };
  //logger.debug("addNews data:", data);
  then(function(cont){
    News.save(data, function(err, news){
      cont(err);
    });
  }).then(function(cont, news){
    News.getByPage(20, 0, function(err, data){
      cont(err, data);
    })
  }).then(function(cont, data){
    logger.debug("data:", data);
    res.render('admin/news_table',{
      news: data
    })
  }).fail(function(cont, err){
    //todo: here need to return page.
    res.json({ret: -1, msg: err});
  });
};

module.exports.getNews = function(req, res, next){
  var id = req.params.id;
  logger.debug("getNews:", id);
  News.getById(id, function(err, data){
    if(err){
      return res.json({ret: -1, msg: "system error."});
    }
    res.json({ret: 0, news: data});
  });
};

module.exports.deleteNews = function(req, res, next){
  var id = req.params.id;
  logger.debug("deleteNews:", id);
  then(function(cont){
    News.delete(id, function(err, data) {
      cont(err);
    });
  }).then(function(cont){
    News.getByPage(20, 0, function(err, data){
      cont(err, data);
    })
  }).then(function(cont, data){
    res.render('admin/news_table',{
      news: data
    });
  }).fail(function(cont, err){
    res.json({ret: -1, msg: err.message});
  });
};
