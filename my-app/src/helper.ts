import axios from "axios";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const SOCKET_URL = "http://localhost:4001";

export const initiateSocket = () => {
    socket = io(SOCKET_URL, {
        query: { nickname: "tanaca" },
    });

    console.log("Connecting to socket");

    if (socket) {
        socket.emit("CHANNEL_JOIN", "general");
    }
};

export const subscribeToMessages = (
    callback: (arg0: null, arg1: any) => void,
) => {
    if (!socket) {
        return;
    }

    socket.on("NEW_MESSAGE", (data: any) => {
        callback(null, data);
    });
};

export const sendMessage = (data: any) => {
    if (!socket) {
        return;
    }

    socket.emit("MESSAGE_SEND", data);
};

export const fetchChannels = async () => {
    const response = await axios.get(`${SOCKET_URL}/getChannels`);

    return response.data.channels;
};

export const fetchChannelMessages = async (channel: string) => {
    const response = await axios.get(
        `${SOCKET_URL}/channels/${channel}/messages`,
    );

    return response.data.allMessages;
};
