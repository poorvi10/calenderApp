var express = require('express');
var router = express.Router();
var User = require("../models/signIn");

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/', function (req, res, next) {
  
    var user = new User({
        token: req.body.token,
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
    });

    user.save(function(err, result) {
        if(err) {
            if (err.code == 11000) {
                res.status(201).json({
                    message: "User credentials saved",
                    obj: result
                });
            }
            return res.status(500).json({
                title: "An error occured",
                error: err
            });
        }
        res.status(201).json({
            message: "User credentials saved",
            obj: result
        });
    });
});

module.exports = router;
