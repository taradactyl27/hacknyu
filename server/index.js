const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const passport = require("passport");

const users = require("./routes/api/users");
const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(keys.MONGO_KEY, { useNewUrlParser: true }).then(() => {
  console.log("Connected to database"));
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
