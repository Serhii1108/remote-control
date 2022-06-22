import { WebSocketServer } from "ws";
import { wsMessageHandler } from "./handlers/wsMessageHandler.js";

export const createWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("listening", () => {
    console.log(`Websocket server start on the ${port} port!`);
  });

  wss.on("connection", (ws) => {
    console.log("Websocket connected!");

    ws.on("message", wsMessageHandler);
  });

  wss.on("error", (err) => {
    console.error(err);
  });
};
