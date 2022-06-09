/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

import "./App.css";
import handleMouseMove from "./helper/trackMouse";
import { v4 } from "uuid";
import Mouse from "./components/Mouse";

const id = v4();

function App() {
    const [socket, setSocket] = useState<Socket>(null as any);
    const [cursors, setCursors] = useState<{ [key: string]: string }>({});
    const [name, setName] = useState<string>("");

    let timer: NodeJS.Timeout;

    const cursorListener = useCallback(
        (message: { id: string }) => {
            console.clear();
            console.log(message);
            if (message?.id === id) {
                return null;
            }

            setCursors(
                (prevMessages) =>
                    ({
                        ...prevMessages,
                        [message.id]: message,
                    } as any),
            );
        },
        [cursors, setCursors],
    );

    const renderCursors = useMemo(
        () =>
            Object.keys(cursors).map((cursor) => (
                <Mouse
                    key={(cursors as any)[cursor].id}
                    x={(cursors as any)[cursor].x}
                    y={(cursors as any)[cursor].y}
                    border={(cursors as any)[cursor].color}
                />
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
