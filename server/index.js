/** FEEDBACK: In the server folder, you should have your package.json file. */
const express = require("express");
const path = require("path");
const app = express();

// controllers
const serveHome = (req, res, next) => {
  res.send("<h1>Home Page</h1>");
}

const serveAbout = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"));  
/** FEEDBACK: The one below did not work due to path.join not being used, the reason why we need the path.join is to create an absolute path to the frontend.   */
  // res.sendFile(__dirname + '../index.html') // does not work 
}

// http://localhost:8080/api/name?first=jane&last=doe&age=22.
const serveName = (req, res, next) => {
  const first = req.query.first; 
  const last = req.query.last; 
  const age = req.query.age; 

  if (first && !last && !age) return res.send(`Welcome ${first}!`); 
  if (first && last && !age) return res.send(`Welcome ${first} ${last}!`);

  res.send(`Welcome ${age} year old, ${first} ${last}!`);
}

const serveData = (req, res, next) => {
  const data = [{ first: "Mei", last: "Zhu", age: 22}, { first: "Andy", last: "Zhu", age: 24}];
  res.send(data);
}

// endpoints
app.get("/", serveHome); 
app.get("/about", serveAbout);
app.get("/api/name", serveName);
app.get("/api/data", serveData);

/** FEEDBACK: Love that you included this endpoint! */
app.get('*', (req, res) => { // The wildcard GET path will catch all other GET requests
  res.status(404).send({ msg: '404 Not Found' });
});

// listen 
const port = process.env.PORT || 8080; 
app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 
