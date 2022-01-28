const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const io = require("socket.io")(3001);

const defaultRoutes = require("./routes/default");
const chatRoomRoutes = require("./routes/chat-room-routes");
const accountRoutes = require("./routes/account-routes");
const db = require("./data/database");

const app = express();
const MongoDBStore = mongodbStore(session);
io.on("connection", socket => {
    socket.emit("poruka", "Hello World!");
});

const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "fakultura",
    collection: "sessions"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "fakultura-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 5 * 60 * 1000
    }
}));

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

app.use("/", defaultRoutes);
app.use("/chat-room", chatRoomRoutes);
app.use("/", accountRoutes);

db.connectToDb().then(function () {
    app.listen(3000);
});