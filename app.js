const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const chatRoomRoutes = require("./routes/chat-room-routes");
const accountRoutes = require("./routes/account-routes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use("/", defaultRoutes);
app.use("/chat-room", chatRoomRoutes);
app.use("/", accountRoutes);

app.listen(3000);