// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");


// Server Setup
const app = express();
const PORT = process.env.PORT || 8000;

//Express
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Notes DB
const dbPath = path.resolve(__dirname, "db");
const notesDb = JSON.parse(fs.readFileSync(path.resolve(dbPath, "db.json")));
const notesId = function () {
  for(var i = 0; i < notesDb.length; i++) {
    notesDb[i].id = i; 
  }
}
//API Routes

// GET Request
app.get("/api/notes", function(req, res) {
  notesId();
  return res.json(notesDb);
});

//POST Request
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  notesDb.push(newNote);

  notesId();

  fs.writeFileSync(path.resolve(dbPath, "db.json"), JSON.stringify(notesDb));
  res.json(notesDb);
});

// DELETE Request
app.delete("/api/notes/:id", function(req, res) {
  let deleteId = req.params.id;

  notesId();
  
  notesDb.splice(deleteId, 1);
  fs.writeFileSync(path.resolve(dbPath, "db.json"), JSON.stringify(notesDb));
  res.json(notesDb);
})

//HTML Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join( __dirname, "/public/index.html"));
});

// Listening
app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
})