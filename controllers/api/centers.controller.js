var config = require('config.json');
var express = require('express');
var router = express.Router();
var centerService = require('services/center.service');
var userService = require('services/user.service');
// routes
router.post('/', registerCenter);
router.get('/current', getCurrentUser);
router.put('/:_id', updateCenter);
router.delete('/:_id', deleteCenter);

module.exports = router;


function registerCenter(req, res) {
    centerService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.center.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateCenter(req, res) {
    var centerId = req.center.sub;
    if (req.params._id !== centerId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    centerService.update(centerId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteCenter(req, res) {
    var centerId = req.center.sub;
    if (req.params._id !== centerId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    centerService.delete(centerId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
