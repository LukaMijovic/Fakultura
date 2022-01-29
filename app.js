const path = require("path");

const express = require("express"); //import express paketa
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const io = require("socket.io")(3001);

const defaultRoutes = require("./routes/default");
const chatRoomRoutes = require("./routes/chat-room-routes");
const accountRoutes = require("./routes/account-routes");
const db = require("./data/database");

const app = express(); //pozivanje express funkcije
const MongoDBStore = mongodbStore(session);

const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "fakultura",
    collection: "sessions"
});

app.set("views", path.join(__dirname, "views")); //postavljanje pravila tako da korisnik moze da uzima fajlove iz "views" foldera
app.set("view engine", "ejs"); //postavljanje engina "ejs" - omogucava js da se koristi u html stranicama
//midlver
app.use(express.static("public"));//omogucava klijentu da dobije css i js sa klijentske strane
app.use(express.json());//omogucava da klijentska strana salje posebne zahteve serveru
app.use(express.urlencoded({extended: false}));//obradjuje forme
app.use(session({
    secret: "fakultura-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 5 * 60 * 1000
    }
}));//cookie za prijavu

app.use(async function (req, res, next) {
    const daLiJePrijavljen = req.session.prijavljen;
    const user = req.session.user;

    if (!user || !daLiJePrijavljen) {
        return next();
    }

    res.locals.daLiJePrijavljen = daLiJePrijavljen;
    res.locals.korisnickoIme = user.korisnickoIme;

    next();
});

app.use("/", defaultRoutes);//default rute
app.use("/chat-room", chatRoomRoutes);//rute za razlicite chat roomove
app.use("/", accountRoutes);//rute za prijavljivanje korisnika

db.connectToDb().then(function () { //ceka da se baza podataka poveze sa serverom
    app.listen(3000);//ceka klijenta na portu 3000
});