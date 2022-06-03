import { useEffect, useState } from "react";
import "./Messages.css";

function Messages({ socket }: any) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message: { id: string | number }) => {
            setMessages((prevMessages) => {
                const newMessages: any = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID: string | number) => {
            setMessages((prevMessages) => {
                const newMessages: any = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on("message", messageListener);
        socket.on("deleteMessage", deleteMessageListener);
        socket.emit("getMessages");

        return () => {
            socket.off("message", messageListener);
            socket.off("deleteMessage", deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className="message-list">
            {[...Object.values(messages)]
                .sort((a: any, b: any) => a.time - b.time)
                .map((message: any) => (
                    <div
                        key={message.id}
                        className="message-container"
                        title={`Sent at ${new Date(
                            message.time,
                        ).toLocaleTimeString()}`}
                    >
                        <span className="user">{message.user.name}:</span>
                        <span className="message">{message.value}</span>
                        <span className="date">
                            {new Date(message.time).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default Messages;
