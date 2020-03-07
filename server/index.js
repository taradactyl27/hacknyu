// module imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// file imports
const users = require("./api/users");
const Manager = require("./api/TaskManager");
const keys = require("./config/keys");

// export universal manager
const TaskManager = new Manager();
module.exports = TaskManager;

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(keys.MONGO_KEY, { useNewUrlParser: true }).then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log(err);
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

// run the server
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if we deploy
app.listen(port, () => console.log(`Server running on port ${port}!`));
