import { RawData, WebSocket } from "ws";
import Jimp from "jimp";
import robot from "robotjs";

import { commands } from "../../constants.js";

export const wsMessageHandler = (ws: WebSocket, rawData: RawData) => {
  const command = rawData.toString();

  switch (command) {
    case commands.MOUSE_POS: {
      const { x, y } = robot.getMousePos();
      ws.send(`mouse_position ${x}px,${y}px`);
      break;
    }
    default:
      break;
  }
};
