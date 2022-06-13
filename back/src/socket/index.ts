import { Server, Socket } from "socket.io";
import Cursors from "./events/cursors";
import Messages from "./events/messages";

const users = new Map<string, Socket>();

class Connection {
    io: Server;
    socket: Socket;
    constructor(io: Server, socket: Socket) {
        this.io = io;
        this.socket = socket;

        Cursors(io, socket);
        Messages(io, socket);

        socket.on("disconnect", () => this.disconnect());
        socket.on("connect_error", (err: { message: any }) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }

    disconnect() {
        users.delete(this.socket.id);
    }
}

export function chat(io: Server) {
    io.on("connection", (socket: Socket) => {
        users.set(socket.id, socket);
        new Connection(io, socket);
    });
}
