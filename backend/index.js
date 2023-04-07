const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
var cors = require('cors')
const PORT = 8080
// Route requires
const user = require('./routes/user')
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// 	res.header("Access-Control-Allow-Credentials",true);
// 	next();
//   });


const corsConfig = {
	origin:'http://localhost:3000',
	credentials: true,
  };
app.use(cors(corsConfig));
app.use(morgan('dev'))
// app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store:  new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false ,//require
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/', user)
// console.log(req.session.passport.user)
// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})