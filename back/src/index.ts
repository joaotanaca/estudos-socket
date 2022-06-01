import express from "express";
import http from "http";
import cors from "cors";

import routes from "./routes";
import socket from "./socket";

const port = process.env.PORT || 4001;

const app = express();
app.use(routes);
app.use(cors());

export const server = http.createServer(app);

socket();

server.listen(port, () => console.log(`Server started port ${port}`));
