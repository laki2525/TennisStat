const express = require("express");
const playerRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

playerRoutes.route("/playerSearch/:input").get(function (req, res) {
    let db_connect = dbo.getDb("Tenis");
    let input = req.params.input;
    let [firstName, lastName] = input.split(" ");
    let query = {};
    if (firstName && lastName) {
        query = {
            firstName: { $regex: new RegExp(`^${firstName}`, 'i') },
            lastName: { $regex: new RegExp(`^${lastName}`, 'i') }
        };
    } else {
        query = {
            $or: [
                { firstName: { $regex: new RegExp(`^${input}`, 'i') } },
                { lastName: { $regex: new RegExp(`^${input}`, 'i') } }
            ]
        };
    }
    db_connect
        .collection("players").find(query, { projection: { firstName: 1, lastName: 1, country: 1, _id: 1,  }}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
});
    
playerRoutes.route("/player/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("players")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.send(result);        
        });
});

playerRoutes.route("/allPlayers/").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("players")
        .find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

playerRoutes.route("/player/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        country: req.body.country,
        birthPlace: req.body.birthPlace,
        residence: req.body.residence,
        height: req.body.height,
        weight: req.body.weight,
        plays: req.body.plays,
        backhand: req.body.backhand,
        favoriteSurface: req.body.favoriteSurface,
        coach: req.body.coach,
        turnedPro: req.body.turnedPro,
        season: req.body.season,
        active: req.body.active,
        prizeMoney: req.body.prizeMoney,
        wikipedia: req.body.wikipedia,
        website: req.body.website,
        titles: req.body.titles,
        grandSlams: req.body.grandSlams,
        tourFinals: req.body.tourFinals,
        masters: req.body.masters,
        davisCups: req.body.davisCups,
        teamCups: req.body.teamCups,
        currentRank: req.body.currentRank,
        bestRank: req.body.bestRank,
        currentEloRank: req.body.currentEloRank,
        bestSeason: req.body.bestSeason,
        lastApperance: req.body.lastApperance,
    };
    db_connect.collection("players").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

playerRoutes.route("/updatePlayer/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        country: req.body.country,
        birthPlace: req.body.birthPlace,
        residence: req.body.residence,
        height: req.body.height,
        weight: req.body.weight,
        plays: req.body.plays,
        backhand: req.body.backhand,
        favoriteSurface: req.body.favoriteSurface,
        coach: req.body.coach,
        turnedPro: req.body.turnedPro,
        season: req.body.season,
        active: req.body.active,
        prizeMoney: req.body.prizeMoney,
        wikipedia: req.body.wikipedia,
        website: req.body.website,
        titles: req.body.titles,
        grandSlams: req.body.grandSlams,
        tourFinals: req.body.tourFinals,
        masters: req.body.masters,
        davisCups: req.body.davisCups,
        teamCups: req.body.teamCups,
        currentRank: req.body.currentRank,
        bestRank: req.body.bestRank,
        currentEloRank: req.body.currentEloRank,
        bestSeason: req.body.bestSeason,
        lastApperance: req.body.lastApperance,
        },
    };
    db_connect
        .collection("players")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

playerRoutes.route("/deletePlayer/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("players").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = playerRoutes;