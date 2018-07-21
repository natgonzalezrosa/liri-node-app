require("dotenv").config();

// Use the require keyword to import the keys.js file and store it in a variable
var llaves = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(llaves.twitterKeys);

var command = process.argv[2];

switch (command) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        showSongInfo();
        break;
    case "movie-this":
        showMovieInfo();
        break;
    case "do-what-it-says":
        callLiri();
        break;
    default:
        console.log("Error: please type in command again.");
        break;
};

function getTweets() {

    var parameters = { screen_name: 'natgonzalezrosa', count: 20 };

    client.get('statuses/user_timeline', parameters, function (error, tweets) {

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




function showSongInfo() {

    var spotify = new Spotify(llaves.spotifyKeys);

    var userInput = process.argv[3];

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name +
            "\nSong's Name: " + data.tracks.items[0].name +
            "\nPreview Link of the Song: " + data.tracks.items[0].preview_url +
            "\nAlbum the Song is From: " + data.tracks.items[0].album.name);
    });

};

function showMovieInfo() {

    var movieTitle = process.argv[3];

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title of the Movie: " + JSON.parse(body).Title +
                        "\nYear: " + JSON.parse(body).Year + 
                        "\nIMBD Rating: " + JSON.parse(body).imdbRating +
                        "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + 
                        "\nCountry: " + JSON.parse(body).Country +
                        "\nLanguage: " + JSON.parse(body).Language +
                        "\nPlot: " + JSON.parse(body).Plot +
                        "\nActors: " + JSON.parse(body).Actors +
                        "\n---------------------------------------------------------\n");
            
        };
    });
};