/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initiateSocket, sendMessage, subscribeToMessages } from "./helper";

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        event.stopPropagation();
        setMessage(event.target.value);
    };
    const generateUUID = () => uuidv4();

    const handleMessageSend = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!message) return;

        const data = {
            id: generateUUID(),
            channel: "general",
            user: "tanaca",
            body: message,
            time: Date.now(),
        };
        sendMessage(data);
        setMessage("");
    };

    useEffect(() => {
        initiateSocket();
    }, []);

    useEffect(() => {
        subscribeToMessages((err, data) => {
            console.log(data);

            setMessages((messages) => [...messages, data]);
        });
    }, []);

    return (
        <div className="main-div">
            <input type="text" value={message} onChange={handleMessageChange} />
            <button onClick={handleMessageSend}>Enviar</button>
            {messages?.map((message) => (
                <div key={message.id}>
                    {message?.id}
                    <br />
                    {message?.user}
                    <br />
                    {message?.body}
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
}

export default App;
