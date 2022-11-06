const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //Xem http request tu browser
const mongoose = require("mongoose");
const MongoDBSession = require('connect-mongodb-session')(session);
const hbs = require("hbs");

// Tao path cho Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory
app.use(express.static(publicPath));


app.get('', (req, res) => {
  res.render("index", {
    title: "Welcome"
  })
})

app.get('/login', (req, res) => {
  res.render("login",{
      title: "Login"
  });
});

app.get('/register', (req, res) => {
  res.render("register", {
    title: "Register"
  })
})

//mongodb
const secretKey = process.env.SECRET;
const mongodbURI = process.env.URI;

//Cross origin resource sharing
const cors = require("cors");
app.use(cors({origin: "*"}));

//Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());

//connect to database
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "userdata"
}).then((res) => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.log(err);
});

//Create server session
const storage = new MongoDBSession({
  uri: mongodbURI,
  databaseName: "userdata",
  collection: "mySessions"
});
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: storage
  })
);

//server
const port = process.env.PORT;
http.createServer(app).listen(port, () => console.log(`Server running on http://localhost:${port}`));