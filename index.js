import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blogpost",
  password: "sejal12",
  port: 5432,
});
const app = express();
const port = process.env.PORT || 3000;

db.connect();

let blog = [];
 db.query("SELECT * FROM blogs", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    blog = res.rows;
  }
  db.end();
});



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",{blogs:blog});
});



app.post("/submit", (req, res) => {
 
    debugger;
         let ti =  req.body["blog"] ;
 let i = 11;
        let des =  req.body["description"];
        db.connect();
          
          db.query(
            "INSERT INTO blogs (id,title, description) VALUES($1, $2,$3)",[i,ti, des]
          );
          
        db.end();
          
        res.render("index.ejs",{blogs:blog});

    });

    app.get("/update", (req, res) => {

    
        let title = req.body.title;
        //let desc = req.body["description"];
        res.render("index.ejs", { blog:title});
     
    });
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});