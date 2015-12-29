// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  then = require('thenjs/then.js');

var newsSchema = new Schema({
  title: String,
  url: String,
  content: String,
  thumbnail: String,
  date: {type: Date, default: Date.now},
  top: Boolean,
  hidden: Boolean
});

var newsModel = mongoose.model('News', newsSchema);

function News(news){
  this.title = news.title;
  this.url = news.url;
  this.content = news.content;
  this.thumbnail = news.thumbnail;
  this.date = news.date;
  this.top = news.top;
  this.hidden = news.hidden;
};

News.prototype.save = function(data, callback){
  var news = {
    title: data.title || "",
    url: data.url || "",
    content: data.content || "",
    thumbnail: data.thumbnail || "",
    date: data.date || new Date(),
    top: data.top || false,
    hidden: data.hidden || false
  };
  var queryId = data.id ? data.id : new mongoose.mongo.ObjectID();
  newsModel.findOneAndUpdate({_id: queryId}, news, {upsert: true}, callback);
};

News.prototype.getByPage = function(limit, pageIndex, callback){
  newsModel.find().sort([['date', 'descending']]).exec(callback);
};
News.prototype.getById = function(id, callback){
  newsModel.findOne({_id: id}).exec(callback);
};

News.prototype.delete = function(id, callback){
  newsModel.remove({_id: id}, function(err, data){
    callback(err, data);
  });
};
module.exports = new News({});
