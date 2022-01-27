const express = require("express");

const util = require("../util/util-functions");

const router = express.Router();

router.get("/:id", async function (req, res) {
    const chatRoomId = req.params.id;
    const fakultet = await util.getOneFakultet(chatRoomId);
    console.log(fakultet[0]);

    res.render("chat-room", {id: chatRoomId, fakultet: fakultet[0]});
});

module.exports = router;