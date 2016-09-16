'use strict';

let APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var AlexaSkill = require('./AlexaSkill');
let getTopHackerNews = require('./topHackerNews.js');

var News = function () {
    AlexaSkill.call(this, APP_ID);
};

News.prototype = Object.create(AlexaSkill.prototype);
News.prototype.constructor = News;

News.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

News.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    handleNewsRequest(response);
};

News.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

News.prototype.intentHandlers = {
    "GetTopHackerNews": function (intent, session, response) {
        handleNewsRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me for the Top Hacker News... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Later";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleNewsRequest(response) {
    var cardTitle = "Top Hacker News Stories";

    getTopHackerNews(function(err, results){
      var speechOutput = results.join(", ");
      response.tellWithCard(speechOutput, cardTitle, speechOutput);
    });
}

exports.handler = function (event, context) {
    var news = new News();
    news.execute(event, context);
};
