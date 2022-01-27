const path = require("path");

const express = require("express");
const uuid = require("uuid");

const util = require("./util/util-functions");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/", function (req, res) {
    const fakulteti = util.getFakulteti();
    
    res.render("index", {fakulteti: fakulteti});
});

app.get("/napravi-nalog", function (req, res) {
    res.render("napravi-nalog");
});

app.post("/napravi-nalog", function (req, res) {
    const noviKorisnik = req.body;
    noviKorisnik.id = uuid.v4();
    const korisnici = util.getKorisnici();

    korisnici.push(noviKorisnik);

    util.setKorisnici(korisnici);

    res.redirect("/");
});

app.get("/prijavi-se", function (req, res) {
    res.render("prijavi-se");
});

app.get("/o-nama", function (req, res) {
    res.render("o-nama");
});

app.get("/chat-room/:id", function (req, res) {
    const chatRoomId = req.params.id;
    const fakulteti = util.getFakulteti();

    res.render("chat-room", {id: chatRoomId});
});

app.listen(3000);