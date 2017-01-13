
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var animals = require('../controllers/animals.js');
module.exports = function(app){
	//root route to render the index.ejs view
app.get('/', function(req, res){
	// This is where we will retrieve the users from the database and include them in the view page we will be rendering
	User.find({}, function(err, animal) {
		res.render('index', {animals: animal});
	});
});

app.get('/bear/new', function(req, res) {
	res.render('new_bear');
});

// route to show the information of an animal
app.get('/bear/:id', function(req, res){
	console.log("hello");
	User.findOne({_id: req.params.id}, function(err, animal){
		res.render('one_bear', {animals: animal});
	});
});

// route to edit an animal
app.get('/bear/:id/edit', function(req, res){
	console.log("inside of /bear/:id/edit");
	User.findOne({_id: req.params.id}, function(err, animal){
		res.render('edit_bear', {animals: animal});
	});
});

//Edit an Animal
app.post('/bear/:id', function(req, res){
	console.log("1");
	User.update({_id: req.params.id}, {name: req.body.name, legs: req.body.legs}, function (err, animal){
	res.redirect('/bear/'+req.params.id);
	});
});

app.post('/bear/:id/destroy', function(req, res){
		console.log("2");

	User.remove({_id: req.params.id}, function (err, animal){
		res.redirect('/');
	});
});


// When the user presses the submit button on index.ejs it should send a post request to '/quotes'.  In
//  this route we should add the user to the database and then redirect to the root route (index view).
app.post('/add', function(req, res) {

	// This is where we would add the user from req.body to the database
	console.log("POST DATA", req.body);

 		var user = new User({	 
 			name: req.body.name,
 			legs: req.body.legs
 		})

 	user.save(function(err){
 	// if there is an error console.log that something went wrong!
	 	if(err) {
	 		console.log('something went wrong');
	 		res.render('index', {title: 'you have errors', errors: user.errors});
	 	} else { // else console.log that we did well and then redirect to the root route
	 		console.log('successfully added a user!');
	 		res.redirect('/');
	 	}
 	});
});
 // This is where we would add the user to the database
 // Then redirect to the root route
}




