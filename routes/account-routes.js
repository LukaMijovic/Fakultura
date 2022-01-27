const express = require("express");
const mongodb = require("mongodb");

const util = require("../util/util-functions");
const db = require("../data/database");

const router = express.Router();
const ObjectId = mongodb.ObjectId;

router.get("/napravi-nalog", async function (req, res) {
    const fakulteti = await util.getFakulteti();
    res.render("napravi-nalog", {fakulteti: fakulteti});
});

router.post("/napravi-nalog", async function (req, res) {
    const fakultetId = new ObjectId(req.body.fakultet)
    const fakultet = await db.getDb().collection("fakulteti").findOne({_id: fakultetId});

    const noviKorisnik = {
        korisnickoIme: req.body.korisnickoIme,
        email: req.body.email,
        sifra: req.body.sifra,
        fakultet: { 
            id: fakultetId,
            naziv: fakultet.naziv
        }
    };

    util.setKorisnici(noviKorisnik);

    res.redirect("/");
});

router.get("/prijavi-se", function (req, res) {
    res.render("prijavi-se");
});

module.exports = router;