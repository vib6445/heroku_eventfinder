"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEvent = exports.login = exports.register = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_model_1 = require("../model/user.model");
var signJWT_1 = __importDefault(require("../functions/signJWT"));
var register = function (req, res) {
    // Get user info from body
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password, useLocation = _a.useLocation;
    if (!email || !username || !password) {
        // Return error if not all infos are provided
        return res.status(422).json({ message: 'The fields email, username and password are required' });
    }
    else if (password.length < 8) {
        return res.status(422).json({ message: 'Password must be at least 8 digits long' });
    }
    bcryptjs_1.default.hash(password, 10, function (hashError, hash) {
        // Hash the password to not store it in plain text in db
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        var userInput = {
            // Mongoose Create User Instance
            username: username,
            email: email,
            password: hash,
            useLocation: useLocation,
            myEvents: [],
            suggestedEvents: []
        };
        var userInput2 = new user_model_1.User(userInput);
        userInput2.save(function (err, user) {
            if (err) {
                // console.log(err);
                return res.status(409).json({
                    message: 'Username or Email already taken!',
                    error: err
                });
            }
            return res.status(201).json({ data: user });
        });
    });
};
exports.register = register;
var login = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password; // Get credentials from body
    /*if (password === GOOGLE_PASSWORD) { // Prevent sneaky people from logging in by using the normal Login form to perform Google logins
      return res.status(401).json({
        message: 'Unauthorized!'
      });
    }*/
    user_model_1.User.find({ email: email }) // Find user in db
        .exec()
        .then(function (users) {
        if (users.length !== 1) {
            // If for some reason more than one accounts with this username exist return error
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        bcryptjs_1.default.compare(password, users[0].password, function (error, result) {
            // Compare pws
            if (error) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else if (result) {
                (0, signJWT_1.default)(users[0], function (_error, token) {
                    // Create JWT Token for user
                    if (_error) {
                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    }
                    else if (token) {
                        // Pass Token and general user info back to client
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            user: users[0]
                        });
                    }
                });
            }
            else {
                // passwords don't match
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        });
    });
};
exports.login = login;
var saveEvent = function (req, res, next) {
    console.log("Request");
    var _a = req.body, eventId = _a.eventId, userId = _a.userId;
    user_model_1.User.findByIdAndUpdate(userId, {
        $push: {
            myEvents: [eventId]
        }
    }).exec(function (error, user) {
        res.json(user);
    });
};
exports.saveEvent = saveEvent;
