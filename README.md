
## Summary
This simple note taking application allows you to save notes with a title and plain text. Powered by ExpressJS, the Note Taker app makes creating, viewing, and deleting notes a cinch!

## Prerequisites
* [NodeJS](https://nodejs.org/)

## Installing

Clone the repository to your local development environment.

```
git clone https://github.com/amandalatkins/note-taker.git
```

Navigate to the developer-profile-generator folder using the command prompt.

Run `npm install` to install all dependencies. To use the application locally, run `node server.js` in your CLI, and then open `http://localhost:3000` in your preferred browswer. The Note Taker app is [live on Heroku](https://whispering-woodland-84908.herokuapp.com/) for you to use as well.

## Preview:
![Application Preview](demo.gif)

## Deployed Link:
[Note Taker App](https://whispering-woodland-84908.herokuapp.com/)

## Learning Points:
* This app was a practice in writing the backend code only and then integrating it with provided front end code (index.html, notes.html, and custom jQuery)
* Practice setting up an Express server and in particular learning the importance of using the express.static() function to ensure proper delivery of local js/css files used by html files being delivered via .sendFile();


## Code Snippets

The following code snippet shows how the Express server initialization and setup. Routes are setup in a separate file for organization purposes.

```javascript
// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes file
require('./routes/routes')(app);

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  
```

The following code snippet shows how this app sets up Express routing and uses a JSON file for CRUD interactions.

```javascript
module.exports = app => {

    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        app.get("/api/notes", function (req, res) {
  
            res.json(notes);
        });

 
        app.post("/api/notes", function (req, res) {
          
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });
        app.get("/api/notes/:id", function (req, res) {
          
            res.json(notes[req.params.id]);
        });

        
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });


        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

     
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

      
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });
         
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
     
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

     
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    };

## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [NodeJS](https://nodejs.org/)
* Node Packages:
    * [Express](https://www.npmjs.com/package/express)

## License
This project is licensed under the MIT License.