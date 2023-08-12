const express = require('express');
const path = require('path');
const fs = require('fs');
// Import the feedback router
const PORT = 3001;

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

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => {
fs.readFile("./db/db.json", function (err, data) {
  console.log(JSON.parse(data)); 
  const parsedData = JSON.parse(data);
})

});
app.post ('./api/notes', (req, res) => {
  
})

// fs.writeFile(`./db/db.json`, variable, (err) =>
// err
//   ? console.error(err)
//   : console.log(
//       `New notes have been written to JSON file`
//     )
// )
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, "./public/index.html"))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
