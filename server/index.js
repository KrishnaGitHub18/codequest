import dotenv from "dotenv";
import express, { json } from 'express';
import cors from 'cors';
import db from './db.js';

import compiler from './controller/compilerController.js';

import {Server} from 'socket.io';
import {createServer} from 'http';
import initSocket from "./socket.js";

dotenv.config();
db();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(json());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
initSocket(io);

app.get('/', (req, res) => {
  res.send('Route is working');
});

app.use('/api', compiler);

const port = 8080;
server.listen(port, () => {
  console.log(`Server Started`);
});