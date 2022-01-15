var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database/database-connection';
import { userRoute } from './routes/user.route';
require('ts-node/register');
require('./server.ts');
//jsonwebtoken
const allowedOrigins = ['http://localhost:4214', 'https://interactionprototyping.github.io'];
const corsOptions = {
    origin: allowedOrigins
};
const HOST = process.env.HOST || 'http://localhost/';
const PORT = parseInt(process.env.PORT || '4500');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users/", userRoute());
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    console.log(`Application started on URL ${HOST}:${PORT} !`);
}));
