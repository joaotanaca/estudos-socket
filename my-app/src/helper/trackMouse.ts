import { Socket } from "socket.io-client";

function handleMouseMove(socket: Socket, name: string) {
    return (eventMouse: MouseEvent) => {
        socket.emit("cursors", {
            name,
            x: eventMouse.clientX,
            y: eventMouse.clientY,
        });
    };
}

export default handleMouseMove;
