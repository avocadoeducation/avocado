module.exports = function (app) {

    var jwt = require('jwt-simple');
    var moment = require('moment');
    var crypto = require('crypto');
    var User = require('../models/user.js');

    findAllUsers = function (req, res) {
        console.log("GET - /users");
        User.find(function (err, users) {
            if (err) res.send(500, "Mongo Error");
            else res.send(200, users);
        });

    };


    //GET - Return a User with specified Name
    findByID = function (req, res) {
        console.log("GET - /user/:id");
        //  var name = req.params.Name;
        var id = jwt.decode(req.params.id);
        User.findOne({_id: id.iss}, function (err, user) {
            if (!user) {
                res.send(404, 'No se encuentra este nombre de usuario, revise la petición');
            }
            if (!err) {
                res.send(200, user);

            } else {
                console.log('Internal error: %s', err.message);
                res.send(500, 'Server error');
            }
        });
    };

    //GET - Return a User with specified Name
    //GET - Return a User with specified Name
    findUsername = function (req, res) {
        console.log("GET - /user/:Username");
        //  var name = req.params.Name;
        User.findOne({"Username": req.params.Username}, function (err, user) {
            if (!user) {
                res.send(404, 'No se encuentra este nombre de usuario, revise la petición');
            }
            if (!err) {
                res.send(200, user);

            } else {
                console.log('Internal error: %s', err.message);
                res.send(500, 'Server error');
            }
        });
    };

    function encrypt(user, pass) {
        var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
        return hmac
    }
    authenticate = function (req, res) {

        User.findOne({"Username": req.body.Username}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send(404, 'No se encuentra este nombre de usuario, revise la petición');
            } else if (user) {

                var Password = encrypt(user.Username, req.body.Password);
                if (user.Password != Password) {
                    res.send(404, 'Password error');
                } else {
                    var expires = moment().add(2, 'days').valueOf();
                    var token = jwt.encode({iss: user._id, exp: expires});
                    res.send(200, token);
                }
            }
        });
    };

    //POST - Insert a new User in the DB
    addUser = function (req, res) {
        console.log('POST - /user');
        User.findOne({Username: req.body.Username}, function (err, user) {
            if (!user) {
                var Password = encrypt(req.body.Username, req.body.Password);
                var user = new User({
                    Username: req.body.Username,
                    Password: Password,
                    Name: req.body.Name,
                    Surname: req.body.Surname,
                    Email: req.body.Email,
                    Birthdate: req.body.Birthdate,
                    Gender: req.body.Gender,
                    Location: req.body.Location,
                    Level: req.body.Level,
                    Role: 'registered',
                    Type: 'local'

                });

                user.save(function (err) {
                    if (!err) {
                        var expires = moment().add(2, 'days').valueOf();
                        var token = jwt.encode({iss: user._id, exp: expires});
                        res.send(200, token);
                    } else {
                        console.log(err);
                        if (err.name == 'ValidationError') {

                            res.send(400, 'Validation error');
                        } else {
                            res.send(500, 'Server error');
                        }
                        console.log('Internal error: %s', err.message);
                    }
                });
            } else {
                res.send(400, 'Tere is a User with this Username');
            }
        });
    };



    validateToken = function(req, res){
        console.log('Validate Token');
        var date = Date.now();
        var id = jwt.decode(req.params.id);
        if(id.exp >= date){
            res.send(200,'OK');
        }else{
            res.send(400,'Token Expired');
        }
    };

    //PUT - Update a register User already exists
    updateUser = function (req, res) {
        console.log("PUT - /user/:Username");
        var id = jwt.decode(req.params.id);
        User.findOne({_id: id.iss}, function (err, user) {
            if (!user) {
                res.send(404, 'Not Found');
            }
            else {
                if (req.body.Username != null) user.Username = req.body.Username;
                if (req.body.Password != null) user.Password = req.body.Password;
                if (req.body.Name != null) user.Name = req.body.Name;
                if (req.body.Surname != null) user.Surname = req.body.Surname;
                if (req.body.Email != null) user.Email = req.body.Email;
                if (req.body.Birthdate != null) user.Birthdate = req.body.Birthdate;
                if (req.body.Gender != null) user.Gender = req.body.Gender;
                if (req.body.Location != null) user.Location = req.body.Location;
                if (req.body.Level != null) user.Level = req.body.Level;


                user.save(function (err) {
                    if (!err) {
                        console.log('Updated');
                        res.send(200, user);
                    } else {
                        if (err.name == 'ValidationError') {

                            res.send(400, 'Validation error');
                        } else {

                            res.send(500, 'Server error');
                        }
                        console.log('Internal error: %s', res.statusCode, err.message);
                    }

                    res.send(user);
                });
            }
        });
    };

    removeAllUser = function(user, res){
        for (var i = 0; i < user.Races.length; i++) {
            Race.findOne(user.Races[i]._id, function (err, race) {
                if (race.Admin === user.Username) {
                    if(!race.Users[1]){
                        race.remove(function(err){
                            if(err) res.send(500,'Mongo Error');
                        });
                    }else {
                        race.Admin = race.Users[1].Username;
                    }
                }
                race.Users.pull(user._id);
                race.save(function (err) {
                    if (!err) {
                        console.log('User Removed');
                    } else {
                        res.send(500, "Mongo Error");
                    }
                });
            });
        }
        for (var j = 0; j < user.Groups.length; j++) {
            Group.findOne(user.Groups[i]._id, function (err, group) {
                if (group.Admin === user.Username) {
                    if (!group.Users[1]) {
                        group.remove(function (err) {
                            if (err) res.send(500, 'Mongo Error');
                        });
                    } else {
                        group.Admin = group.Users[1].Username;
                    }
                }
                group.Users.pull(user._id);
                group.save(function (err) {
                    if (!err) {
                        console.log('User Removed');
                    } else {
                        console.log('ERROR: ' + err);
                        res.send(500, "Mongo Error");
                    }
                });
            });
        }
        user.remove(function (err) {
            if (!err) {
                console.log('Removed user');
                res.send(200);
            } else {
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                res.send(500, 'Server Error');
            }
        });
    };

    //DELETE - Delete a User with specified Name
    deleteUser = function (req, res) {
        console.log("DELETE -/user/:id");
        var id = jwt.decode(req.params.id);
        User.findOne({"_id": id.iss}, function (err, user) {
            if (!user) {
                res.send(404, 'Not Found');
            }
            if(!req.body.delete) {
                removeAllUser(user, res);
            }else{
                if(user.Role != 'admin'){
                    res.send(400,'Bad User');
                }else{
                    User.findOne({_id: req.body.delete}, function(err, deleteuser){
                       if(!deleteuser) res.send(404,'User Not Found');
                        else removeAllUser(deleteuser, res);
                    });
                }
            }

        });
    };

    adminUser = function(req, res){
        console.log('GET- Admin User');
        var id = jwt.decode(req.params.id);
        User.findOne({_id:id.iss}, function(err, user){
            if(err) res.send(500,'Mongo Error');
            else {
                if (!user) {
                    res.send(404, 'User Not Found');
                } else {
                    if (user.Role === 'admin') res.send(200, 'admin');
                    else res.send(200, 'registered');
                }
            }
        });
    };




    //Link routes and functions
    app.get('/users', findAllUsers);
    app.get('/user/:id', findByID);
    app.post('/user', addUser);
    app.post('/user/auth', authenticate);
    app.put('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
    app.get('/user/validate/:id', validateToken);
    app.get('/user/admin/:id', adminUser);

};
