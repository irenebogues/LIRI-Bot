// Required all dependencies (modules and files)

require("dotenv").config();

var inquirer = require("inquirer")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require("fs");

 // LIRI Commands

var listOfCommands = ["spotify-this-song", "movie-this", "concert-this"]
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" "); //creates a new array 
// console.log(searchTerm)
 // Functions
function runCommand(command){
  console.log("TextTrackList", command)
  if (command === undefined) {
    console.log(`
    =======================================================================================
    |             HI IM LIRI, How can I help you today? Here is what I can do:             |
    =======================================================================================
      Command                  Action                             npm run _____
    -----------------------------------------------------------------------------
      spotify-this-song    ->  Add a song name after this     ->  song _______
                               command and get its info
       movie-this           ->  Add a movie name after this    ->  movie _______
                               command and get its info

    `);  
  }

  if (command === listOfCommands[0]) { 
      console.log("spotify")
    //  spotify-this-song command (Spotify)
    spotifyThis(); 
   } else if (command === listOfCommands[1]) {
    // movie-this-command (OMDB)
    readAndExecute();
   }
   else if (command === listOfCommands[2]) {
    // concert-this-command (Bandsintown)
    readAndExecute();
   }
};
  
function spotifyThis () {
    var song = "";
    if (searchTerm === undefined) {
        searchTerm = "under pressure, david bowie"
    }
        spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
           song = `
      ┌ls-------------------------------------------------------------------------
      | Song: '${data.tracks.items[0].name}' by ${data.tracks.items[0].artists[0].name}
      | From the Album: ${data.tracks.items[0].album.name}
      | Link to song: ${data.tracks.items[0].href}
      └--------------------------------------------------------------------------
            `;
          
          console.log(song)
         })
        }
    

    runCommand(command)




