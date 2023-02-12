const express = require("express");
const tournamentRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

tournamentRoutes.route("/tournament").get(function (req, res) {
    let db_connect = dbo.getDb("Tenis");
    db_connect
        .collection("tournaments")
        .find({}, { projection: { tournamentName: 1, _id: 0, }})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});
    
tournamentRoutes.route("/tournament/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("tournaments")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

tournamentRoutes.route("/tournaments/:name").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { tournamentName: req.params.name };
    db_connect
        .collection("tournaments")
        .findOne(myquery, { projection: { _id: 0 } }, function (err, result) {
            if (err) throw err;
            if (result != null) 
                res.json(result);
            else
                res.sendStatus(404);
        });
});

tournamentRoutes.route("/tournament/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let tournamentName = req.body.tournamentName;
    db_connect
        .collection("tournaments")
        .findOne({ tournamentName: tournamentName }, function (err, res) {
            if (err) throw err;
            if (res) {
                response.json({
                    message: "Tournament with the same name already exists",
                });
            } else {
                let myobj = {
                    tournamentName: tournamentName,
                    surface: req.body.surface,
                    location: req.body.location,
                    atpPoints: req.body.atpPoints,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    matches: [],
                };
                db_connect
                    .collection("tournaments")
                    .insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        response.json(res);
                });
            }
        });
});

tournamentRoutes.route("/updateTournament/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            tournamentName: req.body.tournamentName,
            surface: req.body.surface,
            location: req.body.location,
            atpPoints: req.body.atpPoints,  
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            matches: []
        },
    };
    db_connect
        .collection("tournaments")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

tournamentRoutes.route("/deleteTournament/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("tournaments").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = tournamentRoutes;