# liri-node-app

## Overview
LIRI Bot is a Language Interpretation and Recognition Interface. LIRI Bot is a command line node app that takes in parameters and gives you back data.

## Motivation
Node.js implementation exercise for the UM Web Development program.

## What can LIRI Bot do?
### Twitter
```node liri.js my-tweets <insert Twitter handle>```

* This will show this username's most recent 20 tweets and when they were created to the terminal/bash window.
![My-tweets](/images/my-tweets.gif)

### Spotify
```node liri.js spotify-this-song <insert song title>```

* This will display information about the song to the terminal/bash window.
![Spotify-this-song](/images/spotify-this-song.gif)

### Movies
```node liri.js movie-this <insert movie title>```

* This will output information about the movie to the terminal/bash window.
![Movie-this](/images/movie-this.gif)

### Do What It Says
```node liri.js do-what-it-says```

* LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
![Movie-this](/images/do-what-it-says.gif)