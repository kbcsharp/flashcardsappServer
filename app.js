require("dotenv").config();

var express = require("express");
var app = express();

var user = require("./controllers/usercontroller");
var card = require("./controllers/cardcontroller");
var note = require("./controllers/notecontroller");

var sequelize = require("./db");
var bodyParser = require("body-parser");

sequelize.sync(); // {force:true}

app.use(bodyParser.json());

app.use(require("./middleware/headers"));

app.use("/user", user);

app.use(require("./middleware/validate-session"));
app.use("/card", card);
app.use("/note", note);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});
