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
const isAuth = require("../middleware/isAuth");

//Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mongodb
const secretKey = process.env.SECRET;
const mongodbURI = process.env.URI;

//Cross origin resource sharing
const cors = require("cors");
const login = require("../routers/login");
app.use(cors({origin: "*"}));

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
  collection: "mySessions",
  cookie: {
    path: '/', 
    httpOnly: true, 
    secure: false, 
    maxAge: 100000 
  }
});
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: storage
  })
);

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

// Serve static files
app.use(express.static(publicPath));

//Routers
app.get('', (req, res) => {
  return res.render("index", {
    title: "Welcome"
  })
})

app.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return res.send({error: err});
    });
  }
  return res.redirect("/");
});

app.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard", {
    title: "Secret page",
    user: req.session.user
  });
});

const loginRouter = require("../routers/login");
app.use("/login", loginRouter);

const registerRouter = require("../routers/register");
app.use("/register", registerRouter);

//server
const port = process.env.PORT;
http.createServer(app).listen(port, () => console.log(`Server running on http://localhost:${port}`));