const express = require("express");
const {ObjectId} = require("mongodb");

const util = require("../util/util-functions");

const router = express.Router();

router.get("/:id", async function (req, res) {
    const chatRoomId = req.params.id;
    const fakultet = await util.getOneFakultet(chatRoomId);
    console.log(fakultet[0]);

    res.render("chat-room", {id: chatRoomId, fakultet: fakultet[0]});
});

router.post("/:id/poruke", async function (req, res) {
    // const tekstPoruke = req.params.poruka;
    // const faksId = 

    // posaljiPoruku(tekstPoruke);

    // res.render("chat-room");
    const chatRoomId = new ObjectId(req.params.id);
    const novaPoruka = {
        tekstPoruke: req.body.tekstPoruke,
        faksId: chatRoomId,
        autor: req.body.autor
    };

    await util.posaljiPoruku(novaPoruka);

    res.json({});
});

router.get("/:id/poruke", async function (req, res) {
    const chatRoomId = new ObjectId(req.params.id);
    //console.log(chatRoomId);
   //const fakultet = await util.getOneFakultet(chatRoomId);
    const poruke = await util.primiPoruke(chatRoomId);
    //console.log(chatRoomId);
    res.json(poruke);
});

module.exports = router;