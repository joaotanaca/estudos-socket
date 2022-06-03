import express from "express";
import http from "http";
import cors from "cors";

import routes from "./routes";
import { chat } from "./socket";

const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(routes);

export const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

chat(io);

server.listen(port, () => console.log(`Server started port ${port}`));
