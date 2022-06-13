import { Server, Socket } from "socket.io";
import { Cursor } from "../../../interfaces/socket/events";

const cursors = new Map<string, Cursor>();

const Cursors = (io: Server, socket: Socket) => {
    const handleChangeCursors = (values: Cursor) => {
        const id = socket.handshake?.query?.id as string;

        const cursor = Object.assign({}, values);

        if (!cursor?.id) {
            cursor.id = id;
        }

        cursors.set(id, cursor);

        sendCursor({ ...cursor });
    };

    const sendCursor = (cursor: Cursor) => {
        io.sockets.emit("cursors", cursor);
    };

    socket.on("cursors", handleChangeCursors);
};

export default Cursors;
