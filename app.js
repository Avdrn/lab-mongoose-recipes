const mongoose = require('mongoose');
// const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const express = require("express");
const app = express();
const bodyParser = require ("body-parser");
var cookieParser = require('cookie-parser');
var path = require('path');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
var hbs = require("hbs");




// Connection to the database "recipeApp"
app.set ("view engine", "hbs");
app.use(express.static("public"));
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({extended:false}));


mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // configuring express session
  app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
// end configuring express session

// set up middleware
// these will always run before every request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up routes

function protectRoute(req, res, next){
  if(req.session.currentUser){ // <== if there's user in the session (user is logged in)
    next();
  debugger  // ==> go to the next route ---
  } else {
    debugger
    res.redirect('/login');
  }
}

app.use(function(req,res,next) {
  if(req.session.currentUser) res.locals.user = req.session.currentUser;
  next();
})
  
app.use("/", require("./routes/home"))
app.use("/recipes", require("./routes/recipes/recipes"))
app.use("/recipe", require("./routes/recipes/recipe"))
app.use("/signup", require("./routes/users/signup"))
app.use("/login", require("./routes/users/login"))
app.use("/logout", require("./routes/users/logout"))
app.use("/recipeAdd", protectRoute, require("./routes/recipes/recipeAdd"))
app.use("/recipeEdit", protectRoute, require("./routes/recipes/recipeEdit"))
app.use("/recipeDelete", protectRoute, require("./routes/recipes/recipeDelete"))



app.listen(3000, ()=> {
console.log("app listening")
})