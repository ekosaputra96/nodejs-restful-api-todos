const express = require("express");
require("dotenv").config();
require("./config/db");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const initialize = require("./config/passport-config");
const errorHandling = require("./middleware/errorHandling");

const PORT = process.env.PORT || 9000;

// init app
const app = express();

// initialize passport
initialize(passport);

// body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// public folder
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cat123",
    resave: false,
    saveUninitialized: false,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./routes/usersRoute"));
app.use("/todos", require("./routes/todosRoute"));

// errorhandling
app.use(errorHandling);

// run the app
app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
