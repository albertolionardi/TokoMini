const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const client = require('./dbClient'); 
const adminRoutes = require('./api/routes/adminRoutes.js')

app.use(bodyParser.json());

client.connect() 
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to the database", err));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});