import { Socket } from "socket.io";
import { server } from "..";

const socketIo = require("socket.io");

const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

const socket = () => {
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
};

export default socket;
