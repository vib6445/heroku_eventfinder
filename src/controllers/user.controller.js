"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEvent = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../model/user.model");
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const register = (req, res) => {
    // Get user info from body
    const { username, email, password, useLocation } = req.body;
    if (!email || !username || !password) {
        // Return error if not all infos are provided
        return res.status(422).json({ message: 'The fields email, username and password are required' });
    }
    else if (password.length < 8) {
        return res.status(422).json({ message: 'Password must be at least 8 digits long' });
    }
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        // Hash the password to not store it in plain text in db
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const userInput = {
            // Mongoose Create User Instance
            username,
            email,
            password: hash,
            useLocation,
            myEvents: [],
            suggestedEvents: []
        };
        const userInput2 = new user_model_1.User(userInput);
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
const login = (req, res, next) => {
    const { email, password } = req.body; // Get credentials from body
    /*if (password === GOOGLE_PASSWORD) { // Prevent sneaky people from logging in by using the normal Login form to perform Google logins
      return res.status(401).json({
        message: 'Unauthorized!'
      });
    }*/
    user_model_1.User.find({ email }) // Find user in db
        .exec()
        .then((users) => {
        if (users.length !== 1) {
            // If for some reason more than one accounts with this username exist return error
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
            // Compare pws
            if (error) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else if (result) {
                (0, signJWT_1.default)(users[0], (_error, token) => {
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
const saveEvent = (req, res, next) => {
    console.log("Request");
    const { eventId, userId } = req.body;
    user_model_1.User.findByIdAndUpdate(userId, {
        $push: {
            myEvents: [eventId]
        }
    }).exec(function (error, user) {
        res.json(user);
    });
};
exports.saveEvent = saveEvent;
