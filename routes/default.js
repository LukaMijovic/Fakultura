const express = require("express");

const util = require("../util/util-functions");

const router = express.Router();

router.get("/", function (req, res) {
    const fakulteti = util.getFakulteti();
    
    res.render("index", {fakulteti: fakulteti});
});

router.get("/o-nama", function (req, res) {
    res.render("o-nama");
});

module.exports = router;