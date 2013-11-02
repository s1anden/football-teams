var express = require('express'),
	teams = require('./routes/teams'),
	players = require('./routes/players'),
	routes = require('./routes/slash'),
	data = require('./models/database'),
	path = require('path');

	//module for reading and writing text files
var fs = require("fs");

var app = express();


// The global datastore for this example
var teams;
var players;

// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}


app.configure(function(){
  app.set('views', __dirname);	// Set the directory for views
  app.set('view engine', 'ejs');	// Set the view engine to EJS
  app.use(express.favicon());	// Return a favicon if requested
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(path.join(__dirname, 'public')));	// Process static files
});

//index page
app.get('/', routes.pathless);

//create
app.put('/teams/:team_id',teams.newTeam);

//get teams
app.get('/teams', function(request, response){
  response.send({
    teams: teams,
    success: true
  });
});

app.get('/teams/:team_id',teams.getTeam);

// create new team
app.put("/teams", function(request, response) {
	console.log("stuff in app.js");	
  console.log(request.body);
  var item = {"teamname": request.body.teamname,
              "city": request.body.city};

  var successful = 
      (item.teamname !== undefined) &&
      (item.city !== undefined);

  if (successful) {
    teams.push(item);
    writeFile("teams.txt", JSON.stringify(teams));
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});


app.delete('/teams/:team_id',teams.deleteTeam);

app.put('/teams/:team_id/players/:player_id',players.newPlayer);
app.get('/teams/:team_id/players',players.listPlayers);
app.get('/teams/:team_id/players/:player_id',players.getPlayer);
app.post('/teams/:team_id/players/:player_id',players.editPlayer);
app.delete('/teams/:team_id/players/:player_id',players.deletePlayer);


function initServer() {
  // When we start the server, we must load the stored data
  var defaultTeam = "[]";
  readFile("teams.txt", defaultTeam, function(err, data) {
    teams = JSON.parse(data);
  });
}

initServer();

app.listen(44444);
console.log("Express server running");