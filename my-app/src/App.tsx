/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

import "./App.css";
import handleMouseMove from "./helper/trackMouse";
import { v4 } from "uuid";

const id = v4();

function App() {
    const [socket, setSocket] = useState<Socket>(null as any);
    const [cursors, setCursors] = useState<{}>({});
    const [name, setName] = useState<string>("");

    let timer: NodeJS.Timeout;

    const cursorListener = (message: { id: string | number }) => {
        if (message?.id === id) return null;

        setCursors((prevMessages) => {
            const newMessages: any = { ...prevMessages };

            newMessages[message.id] = message;
            return newMessages;
        });
    };

    const renderCursors = useMemo(
        () =>
            Object.keys(cursors).map((cursor) => (
                <div
                    key={(cursors as any)[cursor].id}
                    style={{
                        width: 12,
                        height: 18,
                        backgroundColor: "red",
                        position: "absolute",
                        transform: "rotateZ(-20deg)",
                        top: (cursors as any)[cursor].y,
                        left: (cursors as any)[cursor].x,
                    }}
                >
                    {/* {(cursors as any)[cursor].name} */}
                </div>
            )),
        [cursors],
    );

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:4001`, {
            query: { id },
        });
        setSocket(newSocket);
        window.addEventListener("mousemove", handleMouseMove(newSocket, name));
        newSocket.on("cursors", cursorListener);

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove(newSocket, name),
            );
            newSocket.off("cursors", cursorListener);
            newSocket.close();
        };
    }, []);

    return (
        <>
            {renderCursors}
            <div className="App">
                <header className="app-header">React Chat</header>
                <input
                    autoFocus
                    placeholder="Type your name"
                    onChange={(e) => {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(() => {
                            setName(e.target.value);
                        }, 1000);
                    }}
                />
                {socket ? (
                    <div className="chat-container">
                        <Messages socket={socket} />
                        <MessageInput socket={socket} />
                    </div>
                ) : (
                    <div>Not Connected</div>
                )}
            </div>
        </>
    );
}

export default App;
