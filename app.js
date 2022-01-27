const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/", function (req, res) {
   res.render("index");
});

app.get("/napravi-nalog", function (req, res) {
    res.render("napravi-nalog");
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
    res.render("prijavi-se");
});

app.get("/o-nama", function (req, res) {
    res.render("o-nama");
});



app.listen(3000);