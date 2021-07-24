const fs = require('fs');

module.exports = (app) => {
    // gets all notes
    app.get('/api/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

        res.json(notes);
    });

    // adds notes
    app.post('/api/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        const newNote = req.body;
        let newId = notes.length;

        // gives new notes an id
        newNote['id'] = newId.toString();
        newId++;
        notes.push(newNote);

        // writes note to database
        fs.writeFileSync('db/db.json', JSON.stringify(notes));

        res.json(notes);
    });

    // deletes a specific note
    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        let updatedId = 0;
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        // returns non-deleted notes
        const updatedNotes = notes.filter(note => note.id !== id);
        // gives each note a new id
        updatedNotes.map(note => {
            note.id = updatedId.toString();
            updatedId++;
        });
        // writes note to database
        fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes), 'utf-8');
        res.json(notes);
    });
};
