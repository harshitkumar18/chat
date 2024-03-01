import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', client => {
    console.log(`connection received`);
    client.on('new_message', (chat) => {
        console.log(`new message received: ${chat}`)
        io.emit('broadcast', chat);
    });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at ${port}...`);
});
