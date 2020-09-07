// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const notesJSON = require("/db.json");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sets up Routes
// =============================================================

//Notes in JSON
app.get("/api/notes", function(req, res) {
  return res.json(notesJSON);
})


//HTML Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});


// Server listening to PORT
// =============================================================
app.listen(PORT, function() {
  console.log("App is listening on PORT " + PORT)
});