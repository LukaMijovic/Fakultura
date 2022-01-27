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

async function setKorisnici(noviKorisnik) {
    const result = await db.getDb().collection("korisnici").insertOne(noviKorisnik);
}

module.exports = {
    getFakulteti: getFakulteti,
    getKorisnici: getKorisnici,
    setKorisnici: setKorisnici,
    getOneFakultet: getOneFakultet
};