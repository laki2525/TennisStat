const express = require("express");
const matchRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
matchRoutes.route("/match").get(function (req, res) {
    let db_connect = dbo.getDb("Tenis");
    db_connect
        .collection("matches")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});
matchRoutes.route("/matchLastSix").get(function (req, res) {
    let db_connect = dbo.getDb("Tenis");
    db_connect
        .collection("matches")
        .find({})
        .limit(6)
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});
 
matchRoutes.route("/match/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("matches")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
    });
});
 
matchRoutes.route("/match/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        tournamentName: req.body.tournamentName,
        player1Id: req.body.player1Id,
        player2Id: req.body.player2Id,
        date: req.body.date,
        sets: req.body.sets,
        score: req.body.score,
    };
    db_connect.collection("matches").insertOne(myobj, function (err, res) {
        if (err) throw err;
        db_connect.collection("tournaments").updateOne(
            { tournamentName: req.body.tournamentName },
            { $push: { matches: res.insertedId } }, function (err, res) {
                if (err) throw err;
                response.json(res);
            }
        );
    });
});
 
matchRoutes.route("/updateMatch/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("matches")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});
 
matchRoutes.route("/deleteMatch/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("matches").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});
 
module.exports = matchRoutes;