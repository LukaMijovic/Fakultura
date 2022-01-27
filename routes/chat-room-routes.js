const express = require("express");

const util = require("../util/util-functions");

const router = express.Router();

router.get("/:id", function (req, res) {
    const chatRoomId = req.params.id;
    const fakulteti = util.getFakulteti();

    res.render("chat-room", {id: chatRoomId});
});

module.exports = router;