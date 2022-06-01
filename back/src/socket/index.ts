import { Socket } from "socket.io";

export const connection = (socket: Socket) => {
    // Get nickname and channel.
    const { nickname } = socket.handshake.query;
    console.log(`${nickname} connected`);
    // Join the user to the channel.
    socket.join("general" as string);

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log(`${nickname} disconnected`);
    });

    socket.on("MESSAGE_SEND", (data) => {
        const { channel } = data;
        socket.broadcast.to(channel).emit("NEW_MESSAGE", data);
    });
};
