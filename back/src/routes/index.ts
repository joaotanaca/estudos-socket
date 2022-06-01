import express from "express";
const router = express.Router();
import { channels } from "./channels";
import { getChannelMessages } from "./messages";

router.get("/", (_req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
router.get("/channels/:channel/messages", (req, res) => {
    const allMessages = getChannelMessages(req.params.channel);

    return res.json({ allMessages });
});

router.get("/getChannels", (_req, res) => {
    return res.json({ channels });
});

export default router;
