const { ObjectId } = require("mongodb");
const db = require("../data/database");

async function getFakulteti() {
    const fakulteti = await db.getDb().collection("fakulteti").find().toArray();
    
    return fakulteti;
}

async function getOneFakultet(id) {
    const fakultet = await db.getDb().collection("fakulteti").find({_id: new ObjectId(id)}).toArray();
    //console.log(fakultet);
    return fakultet;
}

async function getKorisnici() {
    const korisnici = await db.getDb().collection("korisnici").find().toArray();

    return korisnici;
}

async function getOneKorisnik(email) {
    const korisnik = await db.getDb().collection("korisnici").find({email: email}).toArray();

    return korisnik;
}

async function setKorisnici(noviKorisnik) {
    const result = await db.getDb().collection("korisnici").insertOne(noviKorisnik);
}

async function sendNewMessage(novaPoruka) {
    const result = await db.getDb().collection("poruke").insertOne(novaPoruka);
}

async function getPoruke(fakultetId) {
    const poruke = await db.getDb().collection("poruke").find({faksId: fakultetId}).toArray();
    //console.log(fakultetId);
    return poruke;
}

module.exports = {
    getFakulteti: getFakulteti,
    getKorisnici: getKorisnici,
    setKorisnici: setKorisnici,
    getOneFakultet: getOneFakultet,
    posaljiPoruku: sendNewMessage,
    primiPoruke: getPoruke,
    getOneKorisnik: getOneKorisnik
};