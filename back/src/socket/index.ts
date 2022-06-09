import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const messages = new Set();
const cursors = new Map();
const users = new Map();

const defaultUser = {
    id: "anon",
    name: "Anonymous",
};

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
    io: Server;
    socket: Socket;
    constructor(io: Server, socket: Socket) {
        this.io = io;
        this.socket = socket;

        socket.on("getMessages", () => this.getMessages());
        socket.on("message", (value: string) => this.handleMessage(value));
        socket.on(
            "cursors",
            (cursor: { id: string; name: string; x: string; y: string }) =>
                this.handleChangeCursors(cursor)
        );
        socket.on("disconnect", () => this.disconnect());
        socket.on("connect_error", (err: { message: any }) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }

    sendMessage(message: any) {
        this.io.sockets.emit("message", message);
    }

    getMessages() {
        messages.forEach((message) => this.sendMessage(message));
    }

    handleMessage(value: string) {
        const message = {
            id: uuidv4(),
            user: defaultUser,
            value,
            time: Date.now(),
        };

        messages.add(message);
        this.sendMessage(message);

        setTimeout(() => {
            messages.delete(message);
            this.io.sockets.emit("deleteMessage", message.id);
        }, messageExpirationTimeMS);
    }

    handleChangeCursors(values: {
        id: string;
        name: string;
        x: string;
        y: string;
    }) {
        const id = this.socket.handshake?.query?.id as string;

        const cursor = { ...values, id };

        cursors.set(id, cursor);

        this.sendCursor(cursor);
    }

    sendCursor(cursor: { id: string; name: string; x: string; y: string }) {
        this.io.sockets.emit("cursors", cursor);
    }

    disconnect() {
        users.delete(this.socket);
    }
}

export function chat(io: Server) {
    io.on("connection", (socket) => {
        new Connection(io, socket);
    });
}
