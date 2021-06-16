const fs = require('fs');
const path = require('path');

module.exports = app =>{

    fs.readFile("db/db.json","utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });
        
        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });


    }
 
}