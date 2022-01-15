"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Creates a JWT Token for a given User Instance
 * @param user User Instance that a token should be created for
 * @param callback Callback Function with params depending on the result of the process
 */
var signJWT = function (user, callback) {
    // Calculate Expiration time of token
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(process.env.JWT_EXPIRETIME || 3600) * 10000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jsonwebtoken_1.default.sign({
            username: user.username // Use username as input
        }, process.env.JWT_SECRET || '', // Secret from dotenv
        {
            issuer: process.env.JWT_ISSUER,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, function (error, token) {
            if (error) {
                // If something goes wron call callback with the error
                callback(error, null);
            }
            else if (token) {
                // Else pass on the token
                callback(null, token);
            }
        });
    }
    catch (error) {
        // If something goes wron call callback with the error
        callback(error, null);
    }
};
exports.default = signJWT;
