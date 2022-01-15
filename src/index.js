"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_connection_1 = require("./database/database-connection");
const user_route_1 = require("./routes/user.route");
require('ts-node/register');
require('./server.ts');
//jsonwebtoken
const allowedOrigins = ['http://localhost:4214', 'https://interactionprototyping.github.io'];
const corsOptions = {
    origin: allowedOrigins
};
const HOST = process.env.HOST || 'http://localhost/';
const PORT = parseInt(process.env.PORT || '4500');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users/", (0, user_route_1.userRoute)());
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_connection_1.connectToDatabase)();
    console.log(`Application started on URL ${HOST}:${PORT} !`);
}));
