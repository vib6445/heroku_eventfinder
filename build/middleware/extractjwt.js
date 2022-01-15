"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*
    Middleware that extracts the Users JWT Token from the header,
    verifies if it is valid and stores it to res.locals.jwt
*/
var extractJWT = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Get token from header
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', function (error, decoded) {
            // Verify
            if (error) {
                // Return error Message if validation is unsuccessful
                return res.status(401).json({
                    message: error.message,
                    error: error
                });
            }
            else {
                // Store token and go to next middleware
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        // If no token is passed the User is unauthorized
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.default = extractJWT;
