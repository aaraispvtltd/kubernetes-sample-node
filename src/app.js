const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req,res) => {
  res.send("Home Page");
});

app.get("/dashboard", (req,res) =>{
  res.send("Dashboard Page");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
