exports.newTeam = function(req, res){
  // should check to see if team already exists 
  // (we can just assume names must be unique?)

  // then add team to database
  res.render('main', { name: req.body.name, coach: req.body.coach, city: req.body.city });

};

exports.listTeams = function(req,res){
	
};

exports.getTeam = function(req, res){
 	
};

exports.editTeam = function(req, res){
  
};

exports.deleteTeam = function(req, res){
  // should also delete any players associated with that team

};