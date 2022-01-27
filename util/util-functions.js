const fs = require("fs");
const path = require("path");

const filePathFakulteti = path.join(__dirname, "..", "data", "fakulteti.json");
const filePathKorisnici = path.join(__dirname, "..","data", "korisnici.json");

function getFakulteti() {
    const fakulteti = JSON.parse(fs.readFileSync(filePathFakulteti));

    return fakulteti;
}

function getKorisnici() {
    const fileData = fs.readFileSync(filePathKorisnici);
    const korisnici = JSON.parse(fileData);

    return korisnici;
}

function setKorisnici(korisnici) {
    fs.writeFileSync(filePathKorisnici, JSON.stringify(korisnici));
}

module.exports = {
    getFakulteti: getFakulteti,
    getKorisnici: getKorisnici,
    setKorisnici: setKorisnici
};