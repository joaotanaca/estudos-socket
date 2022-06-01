import express from "express";
import http from "http";
import cors from "cors";

import routes from "./routes";
import { Socket } from "socket.io";

const port = process.env.PORT || 4001;
const socketIo = require("socket.io");

const app = express();
app.use(routes);
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket: Socket) => {
    // Get nickname and channel.
    const { nickname, channel } = socket.handshake.query;
    console.log(`${nickname} connected`);
    // Join the user to the channel.
    socket.join(channel as string);

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log(`${nickname} disconnected`);
    });

    socket.on("CHANNEL_SWITCH", (data) => {
        const { prevChannel, channel } = data;
        if (prevChannel) {
            socket.leave(prevChannel);
        }
        if (channel) {
            socket.join(channel);
        }
    });

    socket.on("MESSAGE_SEND", (data) => {
        const { channel } = data;
        socket.broadcast.to(channel).emit("NEW_MESSAGE", data);
    });
});
