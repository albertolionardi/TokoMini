const express = require("express");
const app = express();
const pg = require("pg");


const { Client } = pg;
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tokomini',
  })
async function connect() {
    await client.connect();
  
    const out = await client
      .query("SELECT $1::text as message", ["Hello world!"])
      .then((obj) => {
        return obj;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  
    console.log(out);
  
    await client.end();
  }

connect()
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(3000);