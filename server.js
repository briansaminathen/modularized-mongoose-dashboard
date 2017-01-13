
var path = require("path"); // path module -- try to figure out where and why we use this
var mongoose = require('mongoose');
var express = require("express"); // Require the express module
var app = express(); // Create the Express App
var bodyParser = require("body-parser"); // Require body-parser (to receive post data from clients)


// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/mongoose_dashboard');


// To make a Model, you first define a schema, which is the blueprint for a model
var userSchema = new mongoose.Schema({
	name: String, 
	legs: String
});


// Retrieve the Schema called 'UserSchema' and store it to the variable User
var User = mongoose.model('User', userSchema); // We are setting this Schema in our Models as 'user'


// Validations
userSchema.path('name').required(true, 'User name cannot be blank');
userSchema.path('legs').required(true, 'Quote name cannot be blank');


app.use(bodyParser.urlencoded()); // Integrate body-parser with our app
app.use(express.static(path.join(__dirname, "./static"))); // Setting our Static Folder Directory
app.set('views', path.join(__dirname, './views')); // Setting our Views Folder Directory
app.set('view engine', 'ejs'); // Setting our Engine set to EJS


var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable

routes_setter(app);




// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})