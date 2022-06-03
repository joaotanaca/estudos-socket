import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

import "./App.css";
import handleMouseMove from "./helpes/trackMouse";

function App() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:4001`);
        setSocket(newSocket);
        window.addEventListener("mousemove", handleMouseMove);

        return () => newSocket.close() as any;
    }, [setSocket]);

    return (
        <div className="App">
            <header className="app-header">React Chat</header>
            {socket ? (
                <div className="chat-container">
                    <Messages socket={socket} />
                    <MessageInput socket={socket} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );
}

export default App;
