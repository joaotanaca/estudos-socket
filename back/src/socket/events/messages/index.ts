import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../../../interfaces/socket/events";

const messages = new Set<Message>();
// const messageExpirationTimeMS = 5 * 60 * 1000;

const defaultUser = {
    id: "anon",
    name: "Anonymous",
};

const Messages = (io: Server, socket: Socket) => {
    const sendMessage = (message: Message) => {
        io.sockets.emit("message", message);
    };

    // const getMessages = () => {
    //     messages.forEach((message) => sendMessage(message));
    // };

    const getAllMessages = () => {
        io.sockets.emit("messages:get", messages);
    };

    const handleMessage = (value: string) => {
        const message = {
            id: uuidv4(),
            user: defaultUser,
            value,
            time: Date.now(),
        };

        messages.add(message);

        sendMessage(message);
    };

    socket.on("messages:get", getAllMessages);
    socket.on("message", handleMessage);
};

export default Messages;
