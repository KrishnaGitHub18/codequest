import dotenv from "dotenv";
import express, { json } from 'express';
import cors from 'cors';
import db from './db.js';

import {Server} from 'socket.io';
import {createServer} from 'http';



dotenv.config();
db();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
io.on('connection', (user)=>{
    console.log("connected: User id is - ", user.id);
})


app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('Route is working');
});

// const port = process.env.PORT || 3000;
const port = 8080;
server.listen(port, () => {
  console.log(`Server Started`);
});