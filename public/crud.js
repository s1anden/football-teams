// Debugging - console.logs run only when true
debug = true;

// Global datastore
var teams = [];
var players = [];

// Implement addListing()
function addTeam(){
	var newTeam = {};

	console.log("adding new team");	
	var tn = $('#teamname-input').val();
	var tc = $('#city-input').val();

	newTeam.teamname = tn;
	newTeam.city = tc;

	teams.push(newTeam);
	console.log("just before calling add/ajax");	
	window.add(tn, tc);

	// Clear Inputs
	$('#teamname-input').val("");
	$('#city-input').val("");
}

function addPlayer(){
	var newPlayer = {};

	console.log("adding new player");	
	var pn = $('#playername-input').val();
	var pt = $('#team-input').val();

	newPlayer.name = pn;
	newPlayer.team = pt;

	print(newPlayer);

	players.push(newPlayer);
	window.add(pn, pt);
	refreshDOM();

	// Clear Inputs
	$('#playername-input').val("");
	$('#team-input').val("");
}


// Implement the add(desc, author, price) function
function add(teamname, city) {
	console.log("running ajax stuff");	
  $.ajax({
    url: "/teams",
		type: "put",
    data: {"teamname": teamname, "city": city},
    success: function(data) { }
  });
}