import { RawData, WebSocket } from "ws";
import Jimp from "jimp";
import robot from "robotjs";

import { commands } from "../../constants.js";
import { swapRedAndBlueChannel } from "../utils/colors.js";

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
      ws.send(`mouse_position ${mouseXPos},${mouseYPos} \0`);
      break;
    }
    case commands.MOUSE_UP: {
      ws.send(`${command} \0`);
      robot.moveMouse(mouseXPos, mouseYPos - arg1);
      break;
    }
    case commands.MOUSE_DOWN: {
      ws.send(`${command} \0`);
      robot.moveMouse(mouseXPos, mouseYPos + arg1);
      break;
    }
    case commands.MOUSE_LEFT: {
      ws.send(`${command} \0`);
      robot.moveMouse(mouseXPos - arg1, mouseYPos);
      break;
    }
    case commands.MOUSE_RIGHT: {
      ws.send(`${command} \0`);
      robot.moveMouse(mouseXPos + arg1, mouseYPos);
      break;
    }
    case commands.SQUARE: {
      ws.send(`${command} \0`);

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
      ws.send(`${command} \0`);

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
    case commands.CIRCLE: {
      ws.send(`${command} \0`);

      const radius = arg1;
      robot.mouseToggle("down");

      const STEP = 0.01;
      for (let i = 0; i <= Math.PI * 2; i += STEP) {
        const x = mouseXPos + radius * Math.cos(i) - radius;
        const y = mouseYPos + radius * Math.sin(i);
        robot.dragMouse(x, y);
      }
      robot.mouseToggle("up");
      break;
    }
    case commands.SCREEN: {
      const imgSize = 200;
      const bmp = robot.screen.capture(
        mouseXPos - imgSize / 2,
        mouseYPos - imgSize / 2,
        imgSize,
        imgSize
      );

      swapRedAndBlueChannel(bmp);

      const img = new Jimp({
        data: bmp.image,
        width: bmp.width,
        height: bmp.height,
      });

      img.getBufferAsync(Jimp.MIME_PNG).then((buffer) => {
        const base64String = buffer.toString("base64");
        ws.send(`prnt_scrn ${base64String} \0`);
      });
      break;
    }
    default:
      break;
  }
};
