import { createWebSocketStream, WebSocketServer } from "ws";
import { wsMessageHandler } from "./handlers/wsMessageHandler.js";
import LogService from "./utils/log.service.js";

export const createWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  const logService = new LogService();

  wss.on("listening", () => {
    logService.wsListeningMessage(port);
  });

  wss.on("connection", (ws) => {
    logService.wsConnectedMessage();

    const wsStream = createWebSocketStream(ws, {
      decodeStrings: false,
      encoding: "utf-8",
    });

    wsStream.on("data", (chunk) => {
      wsMessageHandler(wsStream, chunk, logService);
    });

    wsStream.on("error", () => {
      logService.error();

      wsStream.destroy();
      wss.close();
      process.exit();
    });
  });

  wss.on("error", () => {
    logService.error();

    wss.close();
    process.exit();
  });
};
