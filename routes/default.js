const express = require("express");

const util = require("../util/util-functions");

const router = express.Router();
//router je app samo u ovom fajlu
router.get("/", async function (req, res) {
    const fakulteti = await util.getFakulteti();

    fakulteti.sort(function (fakA, fakB) { //sortiranje kartica sa fakultetima
        if (fakA.naziv > fakB.naziv) {
            return 1;
        }
        return -1;
    });
    
    res.render("index", {fakulteti: fakulteti});
});

router.get("/o-nama", function (req, res) {
    res.render("o-nama");
});

module.exports = router;