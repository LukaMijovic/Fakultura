const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/", function (req, res) {
   const filePath = path.join(__dirname, "views", "index.html");
   res.sendFile(filePath);
});

app.get("/napravi-nalog", function (req, res) {
    const filePath = path.join(__dirname, "views", "napravi-nalog.html");
    res.sendFile(filePath);
});

app.post("/napravi-nalog", function (req, res) {
    const noviKorisnik = req.body;
    const filePath = path.join(__dirname, "data", "korisnici.json")

    const fileData = fs.readFileSync(filePath);
    const korisnici = JSON.parse(fileData);

    korisnici.push(noviKorisnik);

    fs.writeFileSync(filePath, JSON.stringify(korisnici));

    res.redirect("/");
});

app.get("/prijavi-se", function (req, res) {
    
});

app.get("/o-nama", function (req, res) {
    
});



app.listen(3000);