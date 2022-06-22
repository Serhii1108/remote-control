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

  const mouseYPos = robot.getMousePos().y;
  const mouseXPos = robot.getMousePos().x;

  switch (command) {
    case commands.MOUSE_POS: {
      ws.send(`mouse_position ${mouseXPos}px,${mouseYPos}px`);
      break;
    }
    case commands.MOUSE_UP: {
      robot.moveMouse(mouseXPos, mouseYPos - arg1);
      break;
    }
    case commands.MOUSE_DOWN: {
      robot.moveMouse(mouseXPos, mouseYPos + arg1);
      break;
    }
    case commands.MOUSE_LEFT: {
      robot.moveMouse(mouseXPos - arg1, mouseYPos);
      break;
    }
    case commands.MOUSE_RIGHT: {
      robot.moveMouse(mouseXPos + arg1, mouseYPos);
      break;
    }
    case commands.SQUARE: {
      let currXPos = mouseXPos;
      let currYPos = mouseYPos;

      robot.mouseToggle("down");

      robot.moveMouseSmooth(currXPos, (currYPos -= arg1));
      robot.moveMouseSmooth((currXPos += arg1), currYPos);
      robot.moveMouseSmooth(currXPos, (currYPos += arg1));
      robot.moveMouseSmooth((currXPos -= arg1), currYPos);

      robot.mouseToggle("up");

      break;
    }
    case commands.RECTANGLE: {
      let currXPos = mouseXPos;
      let currYPos = mouseYPos;

      robot.mouseToggle("down");

      robot.moveMouseSmooth(currXPos, (currYPos -= arg1));
      robot.moveMouseSmooth((currXPos += arg2), currYPos);
      robot.moveMouseSmooth(currXPos, (currYPos += arg1));
      robot.moveMouseSmooth((currXPos -= arg2), currYPos);

      robot.mouseToggle("up");

      break;
    }
    default:
      break;
  }
};
