# liri-node-app

Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

Motivation
Node.js implmentation exercise

What it does
Twitter
node liri.js my-tweets <insert Twitter handle>

This will show this username's last 20 tweets and when they were created at in your terminal/bash window.

Spotify
node liri.js spotify-this-song <insert song title>

* This will display information about the song in your terminal/bash window

Movies
node liri.js movie-this <insert movie title>

This will output information about the movie in to your terminal/bash window.


Do What It Says
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.