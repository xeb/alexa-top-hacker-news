'use strict';

var TopHackerNews = function() { };

let request = require('request');
let async = require('async');
let util = require('util');

const URL_TOP_STORIES = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const URL_SINGLE_STORY = 'https://hacker-news.firebaseio.com/v0/item/%s.json'
const NUM_STORIES = 5;

var getStory = function(storyNum, callback) {
  request(util.format(URL_SINGLE_STORY, storyNum), function(err, response, body){
    if(!err && response.statusCode == 200) {
      var story = JSON.parse(body);
      callback(null, story.title);
    } else {
      callback(err);
    }
  });
}

var getList = function(callback) {
  let storyNums = [];
  request(URL_TOP_STORIES, function(err, response, body) {
    if(!err && response.statusCode == 200) {
      let list = JSON.parse(body);
      for (var i = 0; i < NUM_STORIES; i++) {
        storyNums.push(list[i]);
      }
      callback(null, storyNums);
    } else {
      callback(err);
    }
  });
}

module.exports = function(complete) {
  getList(function(err, storyNums){
    var tasks = [];
    storyNums.forEach(function(storyNum){
      tasks.push(function(c){
        getStory(storyNum, c);
      });
    });
    async.parallel(tasks, complete);
  });
}
