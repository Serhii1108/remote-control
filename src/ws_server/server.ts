import { WebSocketServer } from "ws";
import { wsMessageHandler } from "./handlers/wsMessageHandler.js";

export const createWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("listening", () => {
    console.log(`\nWebsocket server start on the ${port} port!`);
    console.log("Waiting for connection...");
  });

  wss.on("connection", (ws) => {
    console.log("Websocket connected!");

    ws.on("message", (data) => wsMessageHandler(ws, data));
  });

  wss.on("error", (err) => {
    console.error(err);
  });
};
