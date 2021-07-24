//stating dependencies
// dependencies
const express = require('express');
const path = require('path');
// creates an express.js server
const app = express();

// initial port
const PORT = process.env.PORT || 3001;

// read url or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// gives access to public folder
app.use(express.static(path.join(__dirname, './public')));

// links route scripts
require('./routes/routes')(app);
require('./routes/htmlRoutes')(app);

// add listener
app.listen(PORT, () => console.log(`App listening on: http://localhost:${PORT}`));