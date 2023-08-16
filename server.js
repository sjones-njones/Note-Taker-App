// define variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const database = require("./db/db.json");

// Import the feedback router
const PORT = process.env.PORT || 3001;

// const handleNoteDelete = require('./public/assets/js/index');
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// This view route is a GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// this route is a GET route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  // Send a message to the client
  console.info(`${req.method} request received to get notes`);

  // res.status(200).json(`${req.method} request received to get notes`);
  fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// this defines new object variable
app.post('/api/notes', (req, res) => {
  console.log(`${req.method} request received to add note`);

  const { title, text } = req.body;
  console.log(title);
  console.log(text);
  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };

    // reads file and pushes in new entry
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);

        fs.writeFile(`./db/db.json`, JSON.stringify(parsedData, null, 4), (writeErr) =>
          writeErr ? console.error(writeErr) : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: 'success!',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

// fallback path
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// listens for port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
