require("dotenv").config();

// Use the require keyword to import the keys.js file and store it in a variable
var llaves = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');

// var spotify = new Spotify(keysAccess.spotify);
var client = new Twitter(llaves.twitterKeys);

function getTweets() {
    
    var parameters = {screen_name: 'natgonzalezrosa', count: 20};

    client.get('statuses/user_timeline', parameters, function(error, tweets) {
        
        for (var i = 0; i < tweets.length; i++) {
            if (error) {
                console.log(error);
            }

            else {
                console.log("@" + tweets[i].user.screen_name + ": " + tweets[i].text + " (Tweeted at: " + tweets[i].created_at + ")");
            }
        }
    });
};

getTweets();