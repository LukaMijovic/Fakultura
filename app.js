const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const chatRoomRoutes = require("./routes/chat-room-routes");
const accountRoutes = require("./routes/account-routes");
const db = require("./data/database");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", defaultRoutes);
app.use("/chat-room", chatRoomRoutes);
app.use("/", accountRoutes);

db.connectToDb().then(function () {
    app.listen(3000);
});