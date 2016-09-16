'use strict';


let getTopHackerNews = require('./topHackerNews.js');

getTopHackerNews(function(err, results){
  if(err) {
    console.error(err);
    process.exit(1);
  }
  console.log(results);
})
