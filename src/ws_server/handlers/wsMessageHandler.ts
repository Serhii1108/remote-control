import { Duplex } from "stream";
import { RawData } from "ws";
import Jimp from "jimp";
import robot from "robotjs";

import { commands } from "../../constants.js";
import { swapRedAndBlueChannel } from "../utils/colors.js";
import { drawCircle, drawRectangle, drawSquare } from "../utils/drawFigures.js";

export const wsMessageHandler = (wsStream: Duplex, rawData: RawData) => {
  const data = rawData.toString();
  const splitData = data.split(" ");

  const command = splitData[0];

  const arg1 = Number(splitData[1]);
  const arg2 = Number(splitData[2]);

  const mouseYPos = robot.getMousePos().y;
  const mouseXPos = robot.getMousePos().x;

  switch (command) {
    case commands.MOUSE_POS: {
      wsStream.write(`mouse_position ${mouseXPos},${mouseYPos} \0`);
      break;
    }
    case commands.MOUSE_UP: {
      wsStream.write(`${command} \0`);
      robot.moveMouse(mouseXPos, mouseYPos - arg1);
      break;
    }
    case commands.MOUSE_DOWN: {
      wsStream.write(`${command} \0`);
      robot.moveMouse(mouseXPos, mouseYPos + arg1);
      break;
    }
    case commands.MOUSE_LEFT: {
      wsStream.write(`${command} \0`);
      robot.moveMouse(mouseXPos - arg1, mouseYPos);
      break;
    }
    case commands.MOUSE_RIGHT: {
      wsStream.write(`${command} \0`);
      robot.moveMouse(mouseXPos + arg1, mouseYPos);
      break;
    }
    case commands.SQUARE: {
      wsStream.write(`${command} \0`);
      drawSquare(mouseXPos, mouseYPos, arg1);
      break;
    }
    case commands.RECTANGLE: {
      wsStream.write(`${command} \0`);
      drawRectangle(mouseXPos, mouseYPos, arg1, arg2);
      break;
    }
    case commands.CIRCLE: {
      wsStream.write(`${command} \0`);
      drawCircle(mouseXPos, mouseYPos, arg1);
      break;
    }
    case commands.SCREEN: {
      const imgSize = 200;
      const bitmap = robot.screen.capture(
        mouseXPos - imgSize / 2,
        mouseYPos - imgSize / 2,
        imgSize,
        imgSize
      );

      swapRedAndBlueChannel(bitmap);

      const img = new Jimp({
        data: bitmap.image,
        width: bitmap.width,
        height: bitmap.height,
      });

      img.getBufferAsync(Jimp.MIME_PNG).then((buffer) => {
        const base64String = buffer.toString("base64");
        wsStream.write(`prnt_scrn ${base64String} \0`);
      });
      break;
    }
    default:
      break;
  }
};
