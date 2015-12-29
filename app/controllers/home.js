'use strict';
var News = require('../models/news'),
    then = require('thenjs/then'),
    logger = require('../../config/log.js').logger,
    utils = require('./utils');

module.exports.homePage = function(req, res, next){
  then(function(cont){
    News.getByPage(6, 0, function(err, data){
      //logger.debug(data);
      cont(err, data);
    });
  }).then(function(cont,news){
      var dealed = news.map(function(one){
        one.dateString = utils.dateFormat(one.date, "yyyy-MM-dd");
        return one;
      });
      res.render('home/index', {
        title: '德阳锦江妇科医院',
        navPage: 'home',
        news: dealed
      });
  }).fail(function (cont, err) {
    console.error(err);
  });
};
