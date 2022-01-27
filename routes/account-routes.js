const express = require("express");
const uuid = require("uuid");

const util = require("../util/util-functions");

const router = express.Router();

router.get("/napravi-nalog", function (req, res) {
    res.render("napravi-nalog");
});

router.post("/napravi-nalog", function (req, res) {
    const noviKorisnik = req.body;
    noviKorisnik.id = uuid.v4();
    const korisnici = util.getKorisnici();

    korisnici.push(noviKorisnik);

    util.setKorisnici(korisnici);

    res.redirect("/");
});

router.get("/prijavi-se", function (req, res) {
    res.render("prijavi-se");
});

module.exports = router;