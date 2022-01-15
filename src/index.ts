import express from 'express';
import cors from 'cors';

import { connectToDatabase } from './database/database-connection';
import { userRoute } from './routes/user.route';

require('ts-node/register');
require('./server.ts');

//jsonwebtoken
const allowedOrigins = ['http://localhost:4214', 'https://interactionprototyping.github.io'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

const HOST = process.env.HOST || 'http://localhost/';
const PORT = parseInt(process.env.PORT || '4500');
  
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users/", userRoute());

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Application started on URL ${HOST}:${PORT} !`);
});

