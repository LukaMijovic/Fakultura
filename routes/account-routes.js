const express = require("express");
const mongodb = require("mongodb");

const util = require("../util/util-functions");
const db = require("../data/database");
const { getOneKorisnik } = require("../util/util-functions");

const router = express.Router();
const ObjectId = mongodb.ObjectId;

router.get("/napravi-nalog", async function (req, res) {
    const fakulteti = await util.getFakulteti();
    res.render("napravi-nalog", {fakulteti: fakulteti});
});

router.post("/napravi-nalog", async function (req, res) {
    const fakultetId = req.body.fakultet;
    //console.log(fakultetId);
    const fakultet = await db.getDb().collection("fakulteti").findOne({_id: fakultetId});

    const noviKorisnik = {
        korisnickoIme: req.body.korisnickoIme,
        email: req.body.email,
        sifra: req.body.sifra,
        faksId: fakultetId
    };

    util.setKorisnici(noviKorisnik);

    res.redirect("/");
});

router.get("/prijavi-se", function (req, res) {
    res.render("prijavi-se");
});

router.post("/prijavi-se", async function (req, res){
    const podaciKorisnika = req.body;
    const email = podaciKorisnika.email;
    const sifra = podaciKorisnika.sifra;

    const postojeciKorisnik = await getOneKorisnik(email);

    if (!postojeciKorisnik[0]) {
        console.log("Neuspesna prijava!");
        return res.redirect("/prijavi-se");
    }

    if (!(sifra == postojeciKorisnik[0].sifra)) {
        console.log("Pogresna sifra!");
        return res.redirect("/prijavi-se");
    }

    //console.log(postojeciKorisnik[0].faksId);
    req.session.user = {
        id: postojeciKorisnik[0]._id,
        email: postojeciKorisnik[0].email,
        faksId: postojeciKorisnik[0].faksId,
        korisnickoIme: postojeciKorisnik[0].korisnickoIme
    };
    req.session.prijavljen = true;
    req.session.save(function () {
        res.redirect("/");
    });
});

router.post("/odjavi-se", function (req, res) {
    req.session.user = null;
    req.session.prijavljen = false;
    req.session.save(function () {
        res.redirect("/");
    });
});

module.exports = router;