//read and set any environment variables with the dotenv package
require("dotenv").config();

// Use the require keyword to import the keys.js file and store it in a variable
var llaves = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(llaves.twitterKeys);

// Command variable will take argument vector 2
var command = process.argv[2];

// Command will change and run function depending on the case
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

    // GET request against the Twitter API with the user_timeline as the path
    client.get('statuses/user_timeline', parameters, function (error, tweets) {

        // For loop runs for each of the 20 tweets
        for (var i = 0; i < tweets.length; i++) {

            // If there is an error, console log the error
            if (error) {
                console.log(error);
            }

            // If no error then console log tweet info (scree name, tweets and when tweets were created at)
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

    // Movie title will take the argument vector 3
    var movieTitle = process.argv[3];

    // Run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover the title, year, IMBD rating, Rotten Tomatoes rating, Country, language, plot and actors from the movie
            console.log("Title of the Movie: " + JSON.parse(body).Title +
                "\nYear: " + JSON.parse(body).Year +
                "\nIMBD Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1] +
                "\nCountry: " + JSON.parse(body).Country +
                "\nLanguage: " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors +
                "\n---------------------------------------------------------\n");

        };
    });
};

/* function callLiri() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // If first item in array is "my-tweets" then second item in array is run through the getTweets function
        if (dataArr[0] === "my-tweets") {
            var myTweet = dataArr[1].slice(1, -1)
            getTweets(myTweet);
        }
        
        // If first item in array is "spotify-this-song" then second item in array is run through the showSongInfo function
        else if (dataArr[0] === "spotify-this-song") {
            var mySong = dataArr[1].slice(1, -1);
            showSongInfo(mySong);
        }

        // If first item in array is "movie-this" then second item in array is run through the showMovieInfo function
        else if (dataArr[0] === "movie-this") {
            var myMovie = dataArr[1].slice(1, -1)
            showMovieInfo(myMovie);
        }

    });
}; */