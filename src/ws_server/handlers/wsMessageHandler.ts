import { RawData, WebSocket } from "ws";
import Jimp from "jimp";
import robot from "robotjs";

import { commands } from "../../constants.js";

export const wsMessageHandler = (ws: WebSocket, rawData: RawData) => {
  const data = rawData.toString();
  const splitData = data.split(" ");

  const command = splitData[0];

  const arg1 = Number(splitData[1]);
  const arg2 = Number(splitData[2]);

  const currYPos = robot.getMousePos().y;
  const currXPos = robot.getMousePos().x;

  switch (command) {
    case commands.MOUSE_POS: {
      const { x, y } = robot.getMousePos();
      ws.send(`mouse_position ${x}px,${y}px`);
      break;
    }
    case commands.MOUSE_UP: {
      robot.moveMouse(currXPos, currYPos - arg1);
      break;
    }
    case commands.MOUSE_DOWN: {
      robot.moveMouse(currXPos, currYPos + arg1);
      break;
    }
    case commands.MOUSE_LEFT: {
      robot.moveMouse(currXPos - arg1, currYPos);
      break;
    }
    case commands.MOUSE_RIGHT: {
      robot.moveMouse(currXPos + arg1, currYPos);
      break;
    }
    case commands.SQUARE: {
      let mouseXPos = currXPos;
      let mouseYPos = currYPos;

      robot.mouseToggle("down");

      robot.moveMouseSmooth(mouseXPos, (mouseYPos -= arg1));
      robot.moveMouseSmooth((mouseXPos += arg1), mouseYPos);
      robot.moveMouseSmooth(mouseXPos, (mouseYPos += arg1));
      robot.moveMouseSmooth((mouseXPos -= arg1), mouseYPos);

      robot.mouseToggle("up");

      break;
    }
    default:
      break;
  }
};
